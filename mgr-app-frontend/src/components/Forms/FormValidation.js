import { deleteCookie, setCookie } from "../../functions/cookieUtils";

export const inputValidation = (inputValue, inputType, inputName) => {
    if (inputType === "text"){
        let badChars = inputValue.search(/[^A-Za-z\s\-'áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]/);
        // Returned value must be -1 or else there's bad characters
        if(badChars >= 0) {
            setCookie(inputName, false)
            return false;
        }
        // If input is ok then delete cookie (if there's one)
        deleteCookie(inputName);
        return true;
    }
    else if(inputType === "email"){
        let match = inputValue.search(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
        if(match !== 0){
            setCookie(inputName, false)
            return false;
        }
        // If input is ok then delete cookie (if there's one)
        deleteCookie(inputName);
        return true;
    }
    else if(inputType === "tel") {
        let match = inputValue.search(/^\+?[\d, \s]+$/);
        if(match !== 0){
            console.log("INSIDE")
            setCookie(inputName, false)
            return false;
        }
        // If input is ok then delete cookie (if there's one)
        console.log("OUTSIDE")
        deleteCookie(inputName);
        return true;
    }
}