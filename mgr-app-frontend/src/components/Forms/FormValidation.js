/*
    File containing all functions necessary for cookie based input validation (client side).
*/

import { deleteCookie, setCookie, getCookie } from "../../functions/cookieUtils";

// ===================================== //
// ============ UTILS FUNCS ============ //
// ===================================== //

/**
 * Utility function for inputValidation() to stay DRY. 
 * It controls if there's any bad characters in bad_chars arg and set or delete 'form cookie'.
 * @param {str} input_name  Input name property.
 * @param {int} bad_chars   Result of regex search (if OK = -1 or else it returns int for position of bad char).
 * @returns {bool}          True / False.
 */
const badCharReturnVerif = (input_name, bad_chars) => { 
    // Returned value must be -1 or else there's bad characters
    if(bad_chars >= 0) {
        setCookie(input_name, false)
        return false;
    }
    // If input is ok then delete cookie (if there's one)
    deleteCookie(input_name);
    return true;
}

/**
 * Utility function for inputValidation() to stay DRY. 
 * Control if input is empty to avoid false negative and set or delete 'form cookie'.
 * @param {str} input_name      Input name property.
 * @param {str} input_value     Value of input. 
 * @param {int} matching        Result of regex search (if OK = 0 or else negative number.)
 * @returns {bool}              True / False.
 */
const matchReturnVerif = (input_name, input_value, matching) => {
    // Check if input is empty to avoid false negative
    if(input_value === "") {
        deleteCookie(input_name);
        return true
    }

    if(matching !== 0){
        setCookie(input_name, false)
        return false;
    }
    // If input is ok then delete cookie (if there's one)
    deleteCookie(input_name);
    return true;
}

/**
 * This function deletes form related cookies (used for input validation).
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
 * @param {str} inputValue Input content to verify. 
 * @param {str} inputType Input type (text, email, tel, etc...).
 * @param {str} inputName Input 'name' property.
 * @returns {bool} True if input valid / False if not.
 */
export const inputValidation = (inputValue, inputType, inputName) => {
    let badChars = ""
    let match = ""

    if (inputType === "text"){
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
        return badCharReturnVerif(inputName, badChars)
    }
    else if(inputType === "email"){
        match = inputValue.search(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
        
        // Check regex return value & set/remove cookie (+ check if empty input)
        return matchReturnVerif(inputName, inputValue, match)
    }
    else if(inputType === "textarea"){
        badChars = inputValue.search(/[*#<>{}\[\]\t\\\\]+/);

        return badCharReturnVerif(inputName, badChars)
    }
    else if(inputType === "tel") {
        match = inputValue.search(/^\+?[\d, \s]+$/);

        return matchReturnVerif(inputName, inputValue, match)
        
    }
}