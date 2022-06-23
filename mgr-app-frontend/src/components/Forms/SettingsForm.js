import React, { useContext, useRef } from "react";
import AuthContext from '../../context/AuthContext';
import { 
	Form,
	Legend,
	Bullet,
	Label, 
	LabelPic, 
	RadioLabel, 
	Input, 
	Select, 
	Textarea, 
	AvatarWrapper, 
	Avatar,
	WarningBox,
	WarnIcon
} from "./FormStyles/GlobalForm.style";
import { LogoWrapper, AppLogo, AppTitle, LinkWrapper, LogOrSignLink } from "./FormStyles/LoginForm.style";
import { useCustForm } from "../../hooks/useCustomForm/UseCustForm";
import { InputWarnNormal } from "../../Colors";

const SettingsForm = (props) => {
    const formRef = useRef();
    const { authTokens, user } = useContext(AuthContext);
    const [ customForm ] = useCustForm({
        operation: props.target,
		endpoints: {
			create: "",
			update: "http://127.0.0.1:8000/teacher/update/"
		},
        authTokens: authTokens,
        user: user,
        entryID: "",
		navigateTo: "/",
        formRef: formRef,
    });

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

    return(
        <Form ref={formRef} onSubmit={customForm.handleSubmit}>
				<Legend><Bullet>1</Bullet>Utilisateur</Legend>
				<Label>Nom d'utilisateur :</Label>
				<Input isValid={customForm.isValid("username")} warn_colors={InputWarnNormal} type="text" name="teacher_fname" value={customForm.inputs.username || ""} onChange={customForm.handleChange} required />
				{warningBox("username", "text")}
                <Legend><Bullet>2</Bullet>Mot de passe</Legend>
				<Label>Mot de passe :</Label>
				<Input isValid={customForm.isValid("password")} warn_colors={InputWarnNormal} type="password" name="teacher_lname" value={customForm.inputs.password || ""} onChange={customForm.handleChange} required />
				{warningBox("password", "password")}
				<Input type="submit" value="Sauver" />
			</Form>
    );
}

export default SettingsForm;