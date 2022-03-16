/*
    File containing all functions necessary for cookie based input validation (client side).
*/

import { deleteCookie, setCookie, getCookie } from "../../functions/cookieUtils";

// ===================================== //
// ============ UTILS FUNCS ============ //
// ===================================== //

const getFileBytes = async (file) => {
    const fileByteArrayHex = [];
    let reader  = new FileReader();
    reader.onloadend = (e) => {
        if (e.target.readyState === FileReader.DONE) {
            const arrayBuffer = e.target.result,
            array = new Uint8Array(arrayBuffer);
            // convert bytes to hex value
            for (const a of array) {
                let hexNum = (a).toString(16);
                fileByteArrayHex.push(hexNum.toUpperCase());
            }
        }
        return fileByteArrayHex;
    }
    reader.readAsArrayBuffer(file);
}

const ValidateFile = (fileObj) => {
    const mimeType = fileObj.type;
    const fileSize = fileObj.size;
    getFileBytes(fileObj).then((value) => {
        console.log(value);
    });

    const magicNumbers = {
        "jpg" : ["FF", "D8", "FF", "E0"],
        "png" : ["89", "50", "4E", "47", "0D", "0A", "1A", "0A"],
        "gif" : ""
    }
    // Convert file to bytes (to analyse magic numbers)
    // let reader  = new FileReader();
    // reader.onloadend = (e) => {
    //     if (e.target.readyState === FileReader.DONE) {
    //         const arrayBuffer = e.target.result,
    //         array = new Uint8Array(arrayBuffer);
    //         // convert bytes to hex value
    //         for (const a of array) {
    //             let hexNum = (a).toString(16);
    //             fileByteArrayHex.push(hexNum.toUpperCase());
    //         }
    //     }
    // }
    // reader.readAsArrayBuffer(fileObj);

    // Check magic numbers
    // if(mimeType === "image/jpeg") {
    //     let byteSize = magicNumbers["jpg"].length
    //     for(let i=0; i < byteSize; i++) {
    //         console.log(fileByteArrayHex[i] + " => " + magicNumbers["jpg"][i])
    //         if (fileByteArrayHex[i] !== magicNumbers["jpg"][i]){
    //             console.log("It's NOT a match !!!")
    //             break;
    //         }
    //     }
    // }
    return
}


/**
 * Utility function for inputValidation() to stay DRY. It controls input state with cookies, they can be :
 * null (input is empty, no cookie set), true (value ok, cookie set to true) or false (bad char entered, cookie set to false).
 * @param {str} input_name      Input name property.
 * @param {str} input_value     Input value to check.
 * @param {int} bad_chars       Result of regex search (if OK = -1 or else it returns int for position of bad char).
 * @returns {bool}              True / False.
 */
const badCharReturnVerif = (input_name, input_value, bad_chars) => {
    // If input value is empty, erase cookie to reinit input state
    if(input_value === "") {
        deleteCookie(input_name);
        return true
    }
    if(bad_chars >= 0) {
        // There's a bad character, delete previously set cookies and set new one with 'false'
        deleteCookie(input_name);
        setCookie(input_name, false);
        return false;
    }
    // If input is ok then delete previously set cookie and set a new one with 'true'
    deleteCookie(input_name);
    setCookie(input_name, true);
    return true;
}

/**
 * Utility function for inputValidation() to stay DRY. Same as badCharReturnVerif but with matching search instead.
 * It controls input state with cookies, they can be : null (input is empty, no cookie set), true (value ok, cookie set to true) 
 * or false (bad char entered, cookie set to false).
 * @param {str} input_name      Input name property.
 * @param {str} input_value     Value of input. 
 * @param {int} matching        Result of regex search (if OK = 0 or else negative number.)
 * @returns {bool}              True / False.
 */
const matchReturnVerif = (input_name, input_value, matching) => {
    // If input value is empty, erase cookie to reinit input state
    if(input_value === "") {
        deleteCookie(input_name);
        return true
    }

    if(matching !== 0){
        deleteCookie(input_name);
        setCookie(input_name, false);
        return false;
    }

    deleteCookie(input_name);
    setCookie(input_name, true);
    return true;
}

/**
 * This function deletes ALL form related cookies (used for input validation) to reinit all inputs.
 * @param {*} formRef Form reference (hook useRef)
 */
 export const clearFormCookies = (formRef) => {
    const inputNames = [];
    // Push input names in array 
    Object.keys(formRef).forEach(key => {inputNames.push(formRef[key].name)});
    // Compare input names with cookie name and clear matching cookies
    inputNames.forEach(inputName => {
        if(getCookie(inputName) !== null){
            deleteCookie(inputName)
        }
    });
};

// ========================================================== //
// ============ INPUT VALIDATION FUNCTION (MAIN) ============ //
// ========================================================== //

/**
 * This function checks form inputs content and use cookies to store invalid input names in order to keep trace of badly formatted infos 
 * that haven't been corrected by user before submission (useful to color inputs and warn user when they're wrong).
 * For file input, it'll check file mime-type, size and magic numbers (there'll be no cookie involved for file validation, just a bool return value).
 * @param {str} inputValue Input content to verify. 
 * @param {str} inputType Input type (text, email, tel, etc...).
 * @param {str} inputName Input 'name' property.
 * @returns {bool} True if input valid / False if not.
 */
export const inputValidation = (inputValue, inputType, inputName) => {
    let badChars = ""
    let match = ""
    if (inputType === "file") {
        ValidateFile(inputValue);
    }
    else if (inputType === "text") {
        switch(inputName) {
            case "invoice_address":
                badChars = inputValue.search(/[^\w\sáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.,°:-]+/);
                break;
            case "invoice_postal":
                badChars = inputValue.search(/[^A-Z0-9\s-]+/);
                break;
            default:
                badChars = inputValue.search(/[^\w\sáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ'-]+/);
        }
        // Check regex return value & set/remove cookie
        return badCharReturnVerif(inputName, inputValue, badChars)
    }
    else if(inputType === "email") {
        match = inputValue.search(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
        
        // Check regex return value & set/remove cookie (+ check if empty input)
        return matchReturnVerif(inputName, inputValue, match)
    }
    else if(inputType === "textarea") {
        badChars = inputValue.search(/[*#<>{}\[\]\t\\\\]+/);

        return badCharReturnVerif(inputName, inputValue, badChars)
    }
    else if(inputType === "tel") {
        match = inputValue.search(/^\+?[\d, \s]+$/);

        return matchReturnVerif(inputName, inputValue, match)
        
    }
}