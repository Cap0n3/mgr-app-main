import { useState, useEffect } from "react";

/**
 * Documentation of Returned object of usePassCheck hook.

 */

/**
 * This hook checks password strength and evalutes its level of security. It has a basic level of checking based on password content like
 * numbers, capital letters, symbols and is at least 8 characters and a more advanced checking.
 * 
 * The more advanced password checking is based on zxcvbn (see https://github.com/dropbox/zxcvbn), it gives a more accurate security level score 
 * but also the guesses & time it took to crack the password plus some hints and warnings about the password.
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
 * let expertScore = passCheck.expertLevel;
 * // ... etc ... //
 * ```
 *
 * ## Set custom password level messages
 * 
 * It is possible to set custom messages for password security level instead of default ones ("bad", "weak", "medium", etc...) .
 * To do that, simply define a list of 5 string elements representing the five levels of security like this :
 * 
 * ```js 
 * const [passCheck] = usePassCheck(password, ['Mauvais', 'Faible', 'Moyen', 'Pas mal', 'Bien']);
 * ```
 * > **Note :** only for basic level of security. For expert mode you'll have to implement messages yourself with password expert score level.
 * 
 * ## Returned object
 * 
 * @typedef {Object} PassCheckResults
 * @param   {bool}      isLong              - Is password long enough ? (Minimum 10 characters).
 * @param   {bool}      haveSymbols         - Does password have at least one symbol ?
 * @param   {bool}      haveCaps            - Does password have at least one capitalized letter ?
 * @param   {bool}      haveNum             - Does password have at least one number ?
 * @param   {int}       level               - Level of security (1-5).
 * @param   {string}    msg                 - Level ("Very Bad", "Weak", "Medium", "Pretty Good", "Good").
 * @param   {int}       expertLevel         - More accurate score for password securite (1-4).
 * @param   {int}       estimatedGuesses    - Estimated guesses needed to crack password.
 * @param   {string}    estimatedTime       - Time for an online attack on a service that doesn't ratelimit.
 * @param   {string}    feedbackWarning     - Explains what's wrong with password (not always set).
 * @param   {list}      feedbackHint        - A (possibly-empty) list of suggestions to help choose a less guessable password.
 * 
 * ## Parameters & return
 * 
 * @param       {string}  passwd        Password to check & evaluate.
 * @returns     {PassCheckResults}      Object containing various useful informations about the password.
 */
export const usePassCheck = (passwd, customLevelMsg) => {
    const [passStrengh, setPassStrengh] = useState({isLong: null, haveSpecial: null, haveCap: null, haveNum: null});
    const [strengthLevel, setStrengthLevel] = useState({msg: "", entropyScore: null, level: null});
    const [expertScore, setExpertScore] = useState({score: null, guesses: null, time: null, warning: null, hint: null})
    const [levelMessages, setLevelMessages] = useState(['Very Bad', 'Weak', 'Medium', 'Pretty Good', 'Good'])
    // Setup zxcvbn tool for password (https://github.com/dropbox/zxcvbn)
    const zxcvbn = require('zxcvbn');
    let passwdExpert = null;

    /**
     * Utility function to calculate entropy on a given string. 
     * A result of 4 would be a string with strong entropy and 0 with very low entropy.
     * 
     * @param       {string}    str     - String to analyse.
     * @returns     {int}               - Result 1 to 4.   
     */
    const entropy = (str) => {
        const len = str.length
        // Build a frequency map from the string.
        const frequencies = Array.from(str).reduce((freq, c) => (freq[c] = (freq[c] || 0) + 1) && freq, {})
        // Sum the frequency of each character.
        return Object.values(frequencies).reduce((sum, f) => sum - f/len * Math.log2(f/len), 0)
    }

    /**
     * Function to calculate strength of password based on :
     * - Length of password
     * - Content of password (Symbols, Cap letters, Numbers)
     * - zxcvbn score
     * - Entrpy score
     * 
     * @param   {string}    pwd         - Password to evaluate. 
     * @param   {Object}    pwdObject   - Correspond to passwdState object.
     * @returns {int}                   - Strength score (1-5)
     */
    const calculateStrength = (pwd, pwdObject) => {
        let strength = 0;
        let zxcvbnResult = zxcvbn(pwd);

        // Add points on basic characteristics (max 5 points)
        if (pwdObject["isLong"]) strength += 2;
        if (pwdObject['haveSpecial']) strength += 1;
        if (pwdObject['haveCap']) strength += 1;
        if (pwdObject['haveNum']) strength += 1;
        
        // Add rounded entropy score as points (max 4 points)
        let entropyScore = Math.round(entropy(pwd));
        strength += entropyScore;

        // Add zxcvbn score (max 4)
        strength += zxcvbnResult.score;

        // Calculate average on a 5 points scale (1-5)
        let averageStrength = Math.round((strength / 13) * 5)
        averageStrength = (averageStrength === 0) ? 1 : averageStrength;
        
        return averageStrength;
    }

    /**
     * On first render check if hook custom level messages list (if any) was correctly initialized.
     * Note : For user defined terms for password level messages.
     */
    useEffect(() => {
        if(customLevelMsg !== undefined) {
            let isListValid = true;
            // Check list length and content
            if(customLevelMsg.length !== 5) {
                console.warn("Your list of custom messages is too long, only 5 password strengh level messages are accepted !");
                isListValid = false;
            } else {
                for(let index in customLevelMsg) {
                    if(typeof(customLevelMsg[index]) !== "string") {
                        console.warn(`${customLevelMsg[index]} in list is not a string ! Only strings are accepted as password strengh level messages.`)
                        isListValid = false;
                    }
                }
            }
            
            if (isListValid) setLevelMessages(customLevelMsg);
        }    
    }, [])
     
    /**
     * Check password strength on each password change.
     */
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
        let testSpecial = new RegExp(/[#+"¨()'?!$£:;@^_<>/*%&§°=`]+/);
        let testNumbers = new RegExp(/[0-9]+/);
        let testCaps = new RegExp(/[A-Z]+/);
        let passRegex = new RegExp(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!?"'`/@#$%():;=^&*]).*$/);

        if(passwd !== undefined) {
            // OK something was typed
            passwdState["exists"] = true;
            // Test password
            if(passwd.length < 8) {
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
            
            // Calculate strength of password and set message and password level
            // If there's no password in input then set strength to 0 (to reinit state in switch)
            let strength = passwd ? calculateStrength(passwd, passwdState) : 0;

            // Get entropy score
            let entropy_score = passwd ? entropy(passwd) : null;
             
            switch(strength) {
                case 1:
                    setStrengthLevel({msg: levelMessages[0], entropyScore: entropy_score, level: 1});
                    break;
                case 2:
                    setStrengthLevel({msg: levelMessages[1], entropyScore: entropy_score, level: 2});
                    break;
                case 3:
                    setStrengthLevel({msg: levelMessages[2], entropyScore: entropy_score, level: 3});
                    break;
                case 4:
                    setStrengthLevel({msg: levelMessages[3], entropyScore: entropy_score, level: 4});
                    break;
                case 5:
                    setStrengthLevel({msg: levelMessages[4], entropyScore: entropy_score, level: 5});
                    break;
                default:
                    setStrengthLevel({msg: "", entropyScore: null, level: null});
            }

            // === Expert mode === //
            // Pass password to module
            if (passwd !== "") {
                passwdExpert = zxcvbn(passwd);
                //let updatedValues = {}
                passwdExpertState = {
                    score: passwdExpert.score, 
                    guesses: passwdExpert.guesses, 
                    time: passwdExpert.crack_times_seconds.offline_slow_hashing_1e4_per_second,
                    warning: passwdExpert.feedback.warning,
                    hint: passwdExpert.feedback.suggestions
                };
                setExpertScore(expertScore => ({...expertScore, ...passwdExpertState}));
            }
        }
        console.log(passwd)
    }, [passwd]);

    // Returned object
    let PassCheckResults = {
        is8chars: passStrengh.isLong,
        haveSymbols: passStrengh.haveSpecial,
        haveCaps: passStrengh.haveCap,
        haveNum: passStrengh.haveNum,
        entropy: strengthLevel.entropyScore, 
        level: strengthLevel.level,
        msg: strengthLevel.msg,
        // Expert (zxcvbn)
        zxcvbnScore: expertScore.score,
        estimatedGuesses: expertScore.guesses,
        time2crack: expertScore.time,
        feedbackWarning: expertScore.warning,
        feedbackHint: expertScore.hint
    }

    return [PassCheckResults];
}