import React, { useEffect, useState, useContext, useRef } from "react";
import AuthContext from '../../context/AuthContext';
import { 
	Form,
	Legend,
	Bullet,
	Label,
	Input,
	WarningBox,
	WarnIcon,
    PassCheckWrapper,
    IndicatorWrapper,
    StrenghBar,
    StrengthMsg,
    HintBox,
    HintText,
    HintCheckIcon,
    HintCrossIcon
} from "./FormStyles/GlobalForm.style";
import { usePassCheck } from "../../hooks/usePassCheck/usePassCheck";
import { useCustForm } from "../../hooks/useCustomForm/UseCustForm";
import { useAlert } from 'react-alert';
import { InputWarnNormal, InputWarnCompare } from "../../Colors";

const AccountForm = (props) => {
    const alert = useAlert();
    const formRef = useRef();
    const { authTokens, user, logoutUser } = useContext(AuthContext);
    const [ customForm ] = useCustForm({
        operation: props.target,
		endpoints: {
			create: "",
			update: "http://127.0.0.1:8000/account/"
		},
        authTokens: authTokens,
        user: user,
        entryID: user.user_id,
		navigateTo: "/",
        callback: logoutUser,
        formRef: formRef,
    });

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
			return <WarningBox warn_colors={InputWarnNormal}><WarnIcon warn_colors={InputWarnNormal}/><p>{warnMessages[inputType]}</p></WarningBox>
		}
	}

    /**
     * This function displays an error if password entered was wrong.
     * @returns     JSX block or `null`.
     */
    const passwordErrorBox = () => {
        let warnMessage = "Le mot de passe entré est incorrect !"
        return <WarningBox warn_colors={InputWarnNormal}><WarnIcon warn_colors={InputWarnNormal}/><p>{warnMessage}</p></WarningBox>
    }

    /**
     * This custom submit function checks if password are strong enough and if both password matches. 
     * Then it asks user a final confirmation before submitting changes (and logout user, see callback function).
     * @param   {Object}  e   Event object. 
     */
    const askBeforeSubmit = (e, passLevel) => {
        e.preventDefault();
        if(isMatch) {
            if(passLevel >= 4) {
                // Password is strong enough
                const answer = window.confirm("Vous allez être redirigé vers le login, êtes-vous sûr de vouloir continuer ?");
                if (answer) customForm.handleSubmit(e);
            }
            else {
                // Password is too weak
                alert.show("Le mot de passe n'est pas sûr !");
            }
        } else {
            // Password don't match
            alert.show("Les mots de passe ne correspondent pas !");
        }   
    }

    return(
        <Form ref={formRef} onSubmit={e => {askBeforeSubmit(e, passCheck.level)}}>
				<Legend><Bullet>1</Bullet>Utilisateur</Legend>
				<Label>Changer le nom d'utilisateur :</Label>
				<Input isValid={customForm.isValid("username")} warn_colors={InputWarnNormal} type="text" name="username" value={customForm.inputs.username || ""} onChange={customForm.handleChange} required />
				{warningBox("username", "text")}
                <Legend><Bullet>2</Bullet>Mot de passe</Legend>
                <Label>Mot de passe actuel :</Label>
                <Input type="password" name="current_password" placeholder="Mot de passe actuel" value={customForm.inputs.current_password || ""} onChange={customForm.handleChange} required />
                {customForm.submitError ? passwordErrorBox() : null}
				<Label>Nouveau mot de passe :</Label>
                <Input type="password" name="password" placeholder="Nouveau mot de passe" value={customForm.inputs.password || ""} onChange={customForm.handleChange} />
                <Input isValid={isMatch} warn_colors={InputWarnCompare} type="password" name="confirmPasswd" placeholder="Confirmer mot de passe" value={customForm.inputs.confirmPasswd || ""} onChange={customForm.handleChange} />
                {(isMatch === false) ? <WarningBox warn_colors={InputWarnCompare}><WarnIcon warn_colors={InputWarnCompare} /><p>Mots de passe pas identiques !</p></WarningBox> : null}
                <PassCheckWrapper show={passCheck.level !== null}>
                    <IndicatorWrapper>
                        <StrenghBar leftRounded="15" marginLeft="5" levelColor={passCheck.level} levelCat="first"></StrenghBar>
                        <StrenghBar marginLeft="5" levelColor={passCheck.level} levelCat="second"></StrenghBar>
                        <StrenghBar rightRounded="15" levelColor={passCheck.level} levelCat="third"></StrenghBar>
                    </IndicatorWrapper>
                        <StrengthMsg>{passCheck.msg}</StrengthMsg>
                    <HintBox>
                        <HintText>{passCheck.is8chars ? <HintCheckIcon /> : <HintCrossIcon />} Au moins 8 caractères</HintText>
                        <HintText>{passCheck.haveCaps ? <HintCheckIcon /> : <HintCrossIcon />} Au moins une majuscule (A-Z)</HintText>
                        <HintText>{passCheck.haveNums ? <HintCheckIcon /> : <HintCrossIcon />} Au moins un chiffre (0-9)</HintText>
                        <HintText>{passCheck.haveSymbols ? <HintCheckIcon /> : <HintCrossIcon />} Au moins un symbole (#+"%&, etc...)</HintText>
                    </HintBox>
                </PassCheckWrapper>
				<Input type="submit" value="Sauver" />
			</Form>
    );
}

export default AccountForm;