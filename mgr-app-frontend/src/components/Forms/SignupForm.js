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
        navigateTo: "http://localhost:3000/login",
        formRef: formRef
    })
    

    return(
        <>
            <form ref={formRef} onSubmit={customForm.handleSubmit}>
            <Input isValid={sessionStorage.getItem("username")} type="text" name="username" placeholder="Nom d'utilisateur" value={customForm.inputs.username || ""} onChange={customForm.handleChange} required />
            {customForm.warningMessage("username", "text")}
            <Input isValid={sessionStorage.getItem("first_name")} type="text" name="first_name" placeholder="Prénom" value={customForm.inputs.first_name || ""} onChange={customForm.handleChange} required />
            {customForm.warningMessage("first_name", "text")}
            <Input isValid={sessionStorage.getItem("last_name")} type="text" name="last_name" placeholder="Nom" value={customForm.inputs.last_name || ""} onChange={customForm.handleChange} required />
            {customForm.warningMessage("last_name", "text")}
            <Input isValid={sessionStorage.getItem("email")} type="email" name="email" placeholder="Email" value={customForm.inputs.email || ""} onChange={customForm.handleChange} required />
            {customForm.warningMessage("email", "email")}
            <Input type="submit" value="S'inscrire" />
        </form>
        </>
    );

};

export default SignupForm;