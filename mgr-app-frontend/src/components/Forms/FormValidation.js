
export const inputValidation = (inputValue, inputType) => {
    // [^A-Za-z\s\-\'áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]
    if (inputType === "text"){
        let res = inputValue.search(/[^A-Za-z\s\-'áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]/);
        if(res >= 0) {
            console.log("No special chars please !");
            return false;
        }
        return true;
    }
}