import React, { useRef, useContext, useEffect, useState } from "react";
import { useCustForm } from "../../hooks/useCustomForm/UseCustForm";
import {
	Input,
    WarningBox,
    WarnIcon,
    PassCheckWrapper,
    IndicatorWrapper,
    StrenghBar,
    StrengthMsg
} from "./FormStyles/GlobalForm.style";
import { LinkWrapper, LogOrSignLink } from "./FormStyles/LoginForm.style";
import { SignupContext } from "../../App";

const SignupForm = () => {
    const formRef = useRef();
    const { setIsSignup } = useContext(SignupContext);
    const warnColor = "red";
    const [customForm] = useCustForm({
        operation: "signup",
        endpoints: {
            signup: "http://127.0.0.1:8000/signup/",
        },
        authTokens: null,
        user: null,
        navigateTo: "/",
        formRef: formRef
    })
    // For password
    const [isMatch, setIsMatch] = useState(null);
    const [msg, setMsg] = useState("");

    const [passStrengh, setPassStrengh] = useState({isLong: null, haveSpecial: null, haveCap: null, haveNum: null});
    const [strengthLevel, setStrengthLevel] = useState({msg: "", level: null});
    /**
     * Here to control that password and password confirmation are matching. 
     */
    useEffect(() => {
        let enteredPasswd = customForm.inputs.confirmPasswd;
        let passwd = customForm.inputs.password;
        let passConf = customForm.inputs.confirmPasswd;
        
        if(enteredPasswd !== undefined) {
            if(passwd !== passConf) {
                setIsMatch(false)
            }
            else if(passwd === passConf) {
                setIsMatch(true)
            }
        }
        else {
            setIsMatch(null)
        }
    }, [customForm.inputs.password, customForm.inputs.confirmPasswd]);

    /**
     * Check password strength.
     */
    useEffect(() => {
        let passwd = customForm.inputs.password;
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
            if(passwd.length < 12) {
                if(passwd === "") {
                    // Reset messagef
                    setMsg("");
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
    }, [customForm.inputs.password]);

    /**
	 * This function uses `isValid()` useCustForm hook function to display warning messages for user if input validation has failed.
	 * @param	{string}	inputName	Input name property to ID input.
	 * @param	{string}	inputType	Input type property to display according message.
	 * @returns							JSX block or `null`.
	 */
	const warningBox = (inputName, inputType) => {
		const warnMessages = {
			"file" : "L'image choisie est trop lourde (max 300 ko) ou non valide !",
			"text" : "Les caractères spéciaux ne sont pas autorisés !",
			"email" : "L'adresse e-mail n'est pas valide !",
			"tel" : "Le numéro n'a pas un format valide (ex : 079 645 23 12).",
			"address" : "L'adresse n'est pas valide !",
			"postal" : "Le numéro postal n'est pas valide !",
			"textarea" : "Les caractères spéciaux ne sont pas autorisés !",
		}

		let isVal = customForm.isValid(inputName);

		if(isVal || isVal === null) {
			return null;
		}
		else if (!isVal) {
			return <WarningBox><WarnIcon /><p>{warnMessages[inputType]}</p></WarningBox>
		}
	}
    
    return(
        <>
            <form ref={formRef} onSubmit={customForm.handleSubmit}>
            <Input isValid={customForm.isValid("username")} warnColor={warnColor} type="text" name="username" placeholder="Nom d'utilisateur" value={customForm.inputs.username || ""} onChange={customForm.handleChange} required />
            {warningBox("username", "text")}
            <Input isValid={customForm.isValid("first_name")} warnColor={warnColor} type="text" name="first_name" placeholder="Prénom" value={customForm.inputs.first_name || ""} onChange={customForm.handleChange} required />
            {warningBox("first_name", "text")}
            <Input isValid={customForm.isValid("last_name")} warnColor={warnColor} type="text" name="last_name" placeholder="Nom" value={customForm.inputs.last_name || ""} onChange={customForm.handleChange} required />
            {warningBox("last_name", "text")}
            <Input isValid={customForm.isValid("email")} warnColor={warnColor} type="email" name="email" placeholder="Email" value={customForm.inputs.email || ""} onChange={customForm.handleChange} required />
            {warningBox("email", "email")}
            <Input type="password" name="password" placeholder="Mot de passe" value={customForm.inputs.password || ""} onChange={customForm.handleChange} required />
            <Input isValid={isMatch} warnColor="yellow" type="password" name="confirmPasswd" placeholder="Confirmer mot de passe" value={customForm.inputs.confirmPasswd || ""} onChange={customForm.handleChange} required />
            {(isMatch === false) ? <WarningBox warnColor="yellow"><WarnIcon warnColor="yellow" /><p>Mots de passe pas identiques !</p></WarningBox> : null}
            <PassCheckWrapper show={strengthLevel.level !== null}>
                <IndicatorWrapper>
                    <StrenghBar leftRounded="15" levelColor={strengthLevel.level} levelCat="first"></StrenghBar>
                    <StrenghBar levelColor={strengthLevel.level} levelCat="second"></StrenghBar>
                    <StrenghBar rightRounded="15" levelColor={strengthLevel.level} levelCat="third"></StrenghBar>
                </IndicatorWrapper>
                    <StrengthMsg>{strengthLevel.msg}</StrengthMsg>
            </PassCheckWrapper>
            <Input type="submit" value="S'inscrire" />
            <LinkWrapper>
                <LinkWrapper>
                    <span>Déjà inscrit ? <LogOrSignLink href={null} onClick={() => setIsSignup(false)}>Vers le login</LogOrSignLink></span>
                </LinkWrapper>
            </LinkWrapper>
        </form>
        </>
    );

};

export default SignupForm;