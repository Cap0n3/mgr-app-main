import { useState, useEffect } from "react";

/**
 * Documentation of Returned object of usePassCheck hook.

 */

/**
 * This hook checks password strength and evalutes its level of security. It has a basic level of checking based on password content like
 * numbers, capital letters, symbols and is at least 10 chars and a more advanced checking.
 * 
 * The more advanced password checking is based on zxcvbn (see https://github.com/dropbox/zxcvbn), it gives a more accurate security level score 
 * but also the guesses it took to find the password, the time it would take to crack the current password & some hint and warnings about the password.
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
 * @param   {bool}      isLong              - Is password long enough ? (Minimum 10 characters).
 * @param   {bool}      haveSymbols         - Does password have at least one symbol ?
 * @param   {bool}      haveCaps            - Does password have at least one capitalized letter ?
 * @param   {bool}      haveNum             - Does password have at least one number ?
 * @param   {int}       level               - Level of security (1-5).
 * @param   {string}    msg                 - Level ("Bad", "Weak", "Medium", "Good", "Excellent").
 * @param   {int}       expertLevel         - More accurate score for password securite (1-4).
 * @param   {int}       estimatedGuesses    - estimated guesses needed to crack password.
 * @param   {string}    estimatedTime       - Time for an online attack on a service that doesn't ratelimit.
 * @param   {string}    feedbackWarning     - Explains what's wrong with password (not always set).
 * @param   {list}      feedbackHint        - A (possibly-empty) list of suggestions to help choose a less guessable password.
 * 
 * ## Parameters & return
 * 
 * @param       {string}  passwd        Password to check & evaluate.
 * @returns     {PassCheckResults}      Object containing various useful informations about the password.
 */
export const usePassCheck = (passwd) => {
    const [passStrengh, setPassStrengh] = useState({isLong: null, haveSpecial: null, haveCap: null, haveNum: null});
    const [strengthLevel, setStrengthLevel] = useState({msg: "", level: null});
    const [expertScore, setExpertScore] = useState({score: null, guesses: null, time: null, warning: null, hint: null})
    // Setup zxcvbn tool for password (https://github.com/dropbox/zxcvbn)
    const zxcvbn = require('zxcvbn');
    let passwdExpert = null;
    
    useEffect(() => {
        // Objects to update with current states
        let passwdState = {
            exists: null, // Is there something in input
            isLong: null,  // Is it long enough ?
            haveSpecial: null, // Have any symbols ?
            haveCap: null, // Have any cap letters ?
            haveNum: null // Have any numbers ?
        };
        let passwdExpertState = {
            score: null, 
            guesses: null, 
            time: null, 
            warning: null,
            hint: null
        };
        // Reset all previous states (to avoid any errors)
        setPassStrengh(passStrengh => ({...passStrengh, ...passwdState}));
        setStrengthLevel({msg: "", level: null});
        setExpertScore(expertScore => ({...expertScore, ...passwdExpertState}));
        // Regex tests
        let testSpecial = new RegExp(/[#+"()'?!$@^_<>*%&`]+/);
        let testNumbers = new RegExp(/[0-9]+/);
        let testCaps = new RegExp(/[A-Z]+/);
        let passRegex = new RegExp(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!?"'`/@#$%():;=^&*]).*$/);

        if(passwd !== undefined) {
            // OK something was typed
            passwdState["exists"] = true;
            // Test password
            if(passwd.length < 10) {
                if(passwd === "") {
                    // Reset state
                    passwdState["exists"] = null;
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

            // Is password is not long enough, set it to "weak" (no matter what)
            if(passwdState["isLong"] === false && strength > 2) {
                strength = 2;
            }
             
            switch(strength) {
                case 1:
                    setStrengthLevel({msg: "Mauvais", level: 1});
                    break;
                case 2:
                    setStrengthLevel({msg: "Faible", level: 2});
                    break;
                case 3:
                    setStrengthLevel({msg: "Médiocre", level: 3});
                    break;
                case 4:
                    setStrengthLevel({msg: "Bien", level: 4});
                    break;
                case 5:
                    setStrengthLevel({msg: "Excellent", level: 5});
                    break;
                default:
                    setStrengthLevel({msg: "", level: null});
            }

            // === Expert mode === //
            // Pass password to module
            if (passwd !== "") {
                passwdExpert = zxcvbn(passwd);
                //let updatedValues = {}
                passwdExpertState = {
                    score: passwdExpert.score, 
                    guesses: passwdExpert.guesses, 
                    time: passwdExpert.crack_times_display.offline_slow_hashing_1e4_per_second,
                    warning: passwdExpert.feedback.warning,
                    hint: passwdExpert.feedback.suggestions
                };
                setExpertScore(expertScore => ({...expertScore, ...passwdExpertState}));
            }
            // console.log(passwd)
            // console.log(passStrengh)
            // console.log(strengthLevel)
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
        // Expert
        expertLevel: expertScore.score,
        estimatedGuesses: expertScore.guesses,
        estimatedTime: expertScore.time,
        feedbackWarning: expertScore.warning,
        feedbackHint: expertScore.hint
    }

    return [PassCheckResults];
}