import React, { useRef } from "react";
import { useCustForm } from "../../hooks/useCustomForm/UseCustForm";
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

const SignupForm = () => {
    const formRef = useRef();
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
            <Input isValid={customForm.isValid("username")} type="text" name="username" placeholder="Nom d'utilisateur" value={customForm.inputs.username || ""} onChange={customForm.handleChange} required />
            {warningBox("username", "text")}
            <Input isValid={customForm.isValid("first_name")} type="text" name="first_name" placeholder="Prénom" value={customForm.inputs.first_name || ""} onChange={customForm.handleChange} required />
            {warningBox("first_name", "text")}
            <Input isValid={customForm.isValid("last_name")} type="text" name="last_name" placeholder="Nom" value={customForm.inputs.last_name || ""} onChange={customForm.handleChange} required />
            {warningBox("last_name", "text")}
            <Input isValid={customForm.isValid("email")} type="email" name="email" placeholder="Email" value={customForm.inputs.email || ""} onChange={customForm.handleChange} required />
            {warningBox("email", "email")}
            <Input type="password" name="password" placeholder="Password" value={customForm.inputs.password || ""} onChange={customForm.handleChange} required />
            <Input type="submit" value="S'inscrire" />
        </form>
        </>
    );

};

export default SignupForm;