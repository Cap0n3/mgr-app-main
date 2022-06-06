import React, { useRef, useContext, useEffect, useState } from "react";
import { useCustForm } from "../../hooks/useCustomForm/UseCustForm";
import {
	Input,
    WarningBox,
    WarnIcon,
    PassCheckWrapper,
    IndicatorWrapper,
    StrenghBar,
    StrengthMsg,
    HintBox
} from "./FormStyles/GlobalForm.style";
import { LinkWrapper, LogOrSignLink } from "./FormStyles/LoginForm.style";
import { SignupContext } from "../../App";
import { usePassCheck } from "../../hooks/usePassCheck/usePassCheck";
import { useAlert } from 'react-alert';
import { InputWarnNormal, InputWarnCompare } from "../../Colors";

const SignupForm = () => {
    const formRef = useRef();
    const alert = useAlert();
    const { setIsSignup } = useContext(SignupContext);

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
    // For password match & strength check
    const levelMessages = ['Mauvais', 'Faible', 'Moyen', 'Pas mal', 'Bien']
    const [isMatch, setIsMatch] = useState(null);
    const [passCheck] = usePassCheck(customForm.inputs.password, levelMessages);

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
     * Utility function to convert seconds in a readable format for humans.
     * @param   {int}       sec2format  - Seconds.
     * @returns {string}                - String representing time (ex : 4 hours).
     */
    const formatTime = (sec2format) => {
        let time = null;
        let unit = null;
        // Is a list to change with ease to other language witout having to change it manually
        const units = ["milliseconde", "seconde", "minute", "heure", "jour", "mois", "ans", "siècle"];
        // One milliseconds, minute, hour, day, month, year is equal to N seconds.
        const inSeconds = {
            millisec: 0.001,
            minute : 60,
            hour: 3600,
            day: 86400,
            month: 2592000,
            year: 31104000,
            century: 3110400000
        }
        // Milliseconds
        if(sec2format < 1) {
            // We always want round numbers
            time = Math.round(sec2format * 1000);
            unit = (time < 2) ? units[0] : units[0] + "s";
        }
        // Seconds
        else if(sec2format >= 1 && sec2format < inSeconds["minute"]) {
            time = Math.round(sec2format);
            unit = (time < 2) ? units[1] : units[1] + "s";
        }
        // Minutes
        else if (sec2format >= inSeconds["minute"] && sec2format < inSeconds["hour"]) {
            let minutes = Math.round(sec2format / inSeconds["minute"]);
            unit = (minutes < 2) ? units[2] : units[2] + "s";
            time = minutes;
        }
        // Hours
        else if(sec2format >= inSeconds["hour"] && sec2format < inSeconds["day"]) {
            let hours = Math.round(sec2format / inSeconds["hour"]);
            unit = (hours < 2) ? units[3] : units[3] + "s";
            time = hours;
        }
        // Days
        else if(sec2format >= inSeconds["day"] && sec2format < inSeconds["month"]) {
            let days = Math.round(sec2format / inSeconds["day"]);
            unit = (days < 2) ? units[4] : units[4] + "s";
            time = days;
        }
        // Months
        else if(sec2format >= inSeconds["month"] && sec2format < inSeconds["year"]) {
            let months = Math.round(sec2format / inSeconds["month"]);
            unit = units[5];
            time = months;
        }
        // Years
        else if(sec2format >= inSeconds["year"] && sec2format < inSeconds["century"]) {
            let years = Math.round(sec2format / inSeconds["year"]);
            unit = units[6];
            time = years;
        }
        // Centuries
        else if(sec2format >= inSeconds["century"]) {
            let centuries = Math.round(sec2format / inSeconds["century"])
            unit = (centuries < 2) ? units[7] : units[7] + "s";
            time = centuries;
        }

        return (time && unit) ? time + " " + unit : null;
    }

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
			return <WarningBox warn_colors={InputWarnNormal}><WarnIcon warn_colors={InputWarnNormal} /><p>{warnMessages[inputType]}</p></WarningBox>
		}
	}

    /**
     * Before submitting, check if password and password confirmation are a match and if password strength is ok.
     * @param   {Object}    e           - Event object. 
     * @param   {int}       passLevel   - Current password strength.
     */
    const checkSubmit = (e, passLevel) => {
        e.preventDefault();
        if(isMatch) {
            if(passLevel >= 4) {
                customForm.handleSubmit(e);
            }
            else {
                alert.show("Le mot de passe n'est pas sûr !");
            }
        } else {
            alert.show("Les mots de passe ne correspondent pas !");
        }
        
    }

    return(
        <>
            <form ref={formRef} onSubmit={e => {checkSubmit(e, passCheck.level)}}>
            <Input isValid={customForm.isValid("username")} warn_colors={InputWarnNormal} type="text" name="username" placeholder="Nom d'utilisateur" value={customForm.inputs.username || ""} onChange={customForm.handleChange} required />
            {warningBox("username", "text")}
            <Input isValid={customForm.isValid("first_name")} warn_colors={InputWarnNormal} type="text" name="first_name" placeholder="Prénom" value={customForm.inputs.first_name || ""} onChange={customForm.handleChange} required />
            {warningBox("first_name", "text")}
            <Input isValid={customForm.isValid("last_name")} warn_colors={InputWarnNormal} type="text" name="last_name" placeholder="Nom" value={customForm.inputs.last_name || ""} onChange={customForm.handleChange} required />
            {warningBox("last_name", "text")}
            <Input isValid={customForm.isValid("email")} warn_colors={InputWarnNormal} type="email" name="email" placeholder="Email" value={customForm.inputs.email || ""} onChange={customForm.handleChange} required />
            {warningBox("email", "email")}
            <Input type="password" name="password" placeholder="Mot de passe" value={customForm.inputs.password || ""} onChange={customForm.handleChange} required />
            <Input isValid={isMatch} warn_colors={InputWarnCompare} type="password" name="confirmPasswd" placeholder="Confirmer mot de passe" value={customForm.inputs.confirmPasswd || ""} onChange={customForm.handleChange} required />
            {(isMatch === false) ? <WarningBox warn_colors={InputWarnCompare}><WarnIcon warn_colors={InputWarnCompare} /><p>Mots de passe pas identiques !</p></WarningBox> : null}
            <PassCheckWrapper show={passCheck.level !== null}>
                <IndicatorWrapper>
                    <StrenghBar leftRounded="15" marginLeft="5" levelColor={passCheck.level} levelCat="first"></StrenghBar>
                    <StrenghBar marginLeft="5" levelColor={passCheck.level} levelCat="second"></StrenghBar>
                    <StrenghBar rightRounded="15" levelColor={passCheck.level} levelCat="third"></StrenghBar>
                </IndicatorWrapper>
                    <StrengthMsg>{passCheck.msg}</StrengthMsg>
                <HintBox>
                    <span>Score expert : {passCheck.zxcvbnScore}</span>
                    <span>Temps pour cracker le mot de passe : {formatTime(passCheck.time2crack)}</span>
                    <ul>
                        {passCheck.feedbackHint ? passCheck.feedbackHint.map((item,index)=>{return <li key={index}>{item}</li>}) : null}
                    </ul>
                </HintBox>
            </PassCheckWrapper>
            <Input type="submit" value="S'inscrire" />
            <LinkWrapper>
                <LinkWrapper>
                    <span>Déjà inscrit ? <LogOrSignLink href={null} onClick={() => setIsSignup(false)}>Vers le login</LogOrSignLink></span>
                </LinkWrapper>
            </LinkWrapper>
        </form>
        {console.log(passCheck)}
        </>
    );

};

export default SignupForm;