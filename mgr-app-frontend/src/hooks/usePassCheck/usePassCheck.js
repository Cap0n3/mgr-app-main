import { useState, useEffect } from "react";
import { PassCheckWrapper } from "../../components/Forms/FormStyles/GlobalForm.style";

/**
 * Documentation of Returned object of usePassCheck hook.

 */

/**
 * This hook checks password strength and evalutes its level of security.
 * 
 * ## Set up
 * 
 * It's quite easy to set up this hook. Once imported, simply do :
 * 
 * ```js 
 *  const [passCheck] = usePassCheck(password);
 * ```
 * > **Note :** Here `password` is the password to be checked.
 * 
 * Then you can access these useful values like this (see PassCheckResults for more infos) :
 * 
 * ```js
 * let secLevel = passCheck.level;
 * let secMsg = passCheck.msg;
 * ```
 * ## Returned object
 * 
 * @typedef {Object} PassCheckResults
 * @param    {bool}      isLong          - Is password long enough ? (Minimum 10 characters).
 * @param    {bool}      haveSymbols     - Does password have at least one symbol ?
 * @param    {bool}      haveCaps        - Does password have at least one capitalized letter ?
 * @param    {bool}      haveNum         - Does password have at least one number ?
 * @param    {int}       level           - Level of security (1-4).
 * @param    {string}    msg             - Level ("Weak", "Medium", "Good", "Excellent").
 * 
 * ## Parameters & return
 * 
 * @param       {string}  passwd        Password to check & evaluate.
 * @returns     {PassCheckResults}      Object containing various useful informations about the password.
 */
export const usePassCheck = (passwd) => {
    const [passStrengh, setPassStrengh] = useState({isLong: null, haveSpecial: null, haveCap: null, haveNum: null});
    const [strengthLevel, setStrengthLevel] = useState({msg: "", level: null});
    
    useEffect(() => {
        // Object to update with new states
        let passwdState = {
            isLong: null, 
            haveSpecial: null, 
            haveCap: null, 
            haveNum: null
        };
        // Regex tests
        let testSpecial = new RegExp(/[#]+/);
        let testNumbers = new RegExp(/[0-9]+/);
        let testCaps = new RegExp(/[A-Z]+/);
        let passRegex = new RegExp(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!?"'`/@#$%():;=^&*]).*$/);

        if(passwd !== undefined) {
            // At least 1 capital letter, 1 digit and 1 of these special chars
            console.log(passwd)
            if(passwd.length < 10) {
                if(passwd === "") {
                    // Reset messagef
                    setStrengthLevel({msg: "", level: null});
                }
                else {
                    // Passwd is too short
                    passwdState["isLong"] = false;
                    // Does it have at least one special char ?
                    testSpecial.test(passwd) ? passwdState["haveSpecial"] = true : passwdState["haveSpecial"] = false;
                    // One number ?
                    testNumbers.test(passwd) ? passwdState["haveNum"] = true : passwdState["haveNum"] = false;
                    // One Cap letter ?
                    testCaps.test(passwd) ? passwdState["haveCap"] = true : passwdState["haveCap"] = false;
                }
                // Update states
                setPassStrengh(passStrengh => ({...passStrengh,...passwdState}))
            } else {
                // OK, password is more thant 10 chars
                passwdState["isLong"] = true;
                // Now test if passwd is strong (long enough, at least one capitialized, one special char, one number)
                if(passRegex.test(passwd)) {
                    passwdState["haveSpecial"] = true;
                    passwdState["haveCap"] = true;
                    passwdState["haveNum"] = true;
                }
                else {
                    // Ok so what's missing ?
                    // Does it have at least one special char ?
                    testSpecial.test(passwd) ? passwdState["haveSpecial"] = true : passwdState["haveSpecial"] = false;
                    // One number ?
                    testNumbers.test(passwd) ? passwdState["haveNum"] = true : passwdState["haveNum"] = false;
                    // One Cap letter ?
                    testCaps.test(passwd) ? passwdState["haveCap"] = true : passwdState["haveCap"] = false;
                }
                // Update states
                setPassStrengh(passStrengh => ({...passStrengh,...passwdState}))
            }
            // Evaluate password strengh
            let strength = 0
            for (const key in passwdState) {
                if(passwdState[key]) {
                    strength++;
                }
            }
            switch(strength) {
                case 1:
                    setStrengthLevel({msg: "Faible", level: 1});
                    break;
                case 2:
                    setStrengthLevel({msg: "Médiocre", level: 2});
                    break;
                case 3:
                    setStrengthLevel({msg: "Bien", level: 3});
                    break;
                case 4:
                    setStrengthLevel({msg: "Excellent", level: 4});
                    break;
                default:
                    setStrengthLevel({msg: "", level: null});
              }
        }
    }, [passwd]);

    // Returned object
    let PassCheckResults = {
        isLong: passStrengh.isLong,
        haveSymbols: passStrengh.haveSpecial,
        haveCaps: passStrengh.haveCap,
        haveNum: passStrengh.haveNum,
        level: strengthLevel.level,
        msg: strengthLevel.msg,
    }

    return [PassCheckResults];
}