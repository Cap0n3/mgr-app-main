import React, { useRef, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import { 
	Form,
	Legend,
	Bullet,
	Label, 
	LabelPic,
	Input, 
	AvatarWrapper, 
	Avatar,
	WarningBox,
	WarnIcon
} from "./FormStyles/GlobalForm.style";
import { useCustForm } from "../../hooks/useCustomForm/UseCustForm";
import { InputWarnNormal } from "../../Colors";

/**
 * Form React Component that is used to CREATE or UPDATE client data throught API calls.
 */
const TeacherFormComponent = (props) => {
	const formRef = useRef();
    const { authTokens, user } = useContext(AuthContext);
    const { userInfos, setUserInfos } = useContext(UserContext);
    const [ customForm ] = useCustForm({
        operation: props.target,
		endpoints: {
			create: "",
			update: "http://127.0.0.1:8000/teacher/update/"
		},
        authTokens: authTokens,
        user: user,
        entryID: props.teacherID,
		navigateTo: "/",
        formRef: formRef,
        radioButtons: {
            invoice_numbering: false,
        }
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

    /**
     * This function first sets first name, last name and profile pic globaly using `UserContext` and then handle submit with `useCustHook` hook.
     * 
     * First & last name & profile pic setup is mainly here to have a more dynamic user infos displaying if user changes them (here for app header user infos). 
     * Of course, it could also be set from `user` object from `AuthContext` but it would need user to relog to take into account changes (which is a pain
     * just for just changing first & last name or profile pic).
     * 
     * > Note : `userInfos` object created by `UserContext` will be updated here if there's new valid infos entered in form. Please not that entry in server will be
     * handled by `handleSubmit` function.
     * 
     * @param   {Object}    e   Event object. 
     */
    const formSubmit = (e) => {
        e.preventDefault();

        // Init URL variable to null
        let file_local_URL = null;

        // Get infos from form
        let rawProfilePic = e.target.teacher_pic.files[0];
        let first_name = e.target.teacher_fname.value;
        let last_name = e.target.teacher_lname.value

        // First, get updated first name and last name
        let updatedInfos = {
            user_fname : first_name,
            user_lname : last_name
        };

        // Then, check if there's a new valid picture (to avoid error in case of invalid image upload)
        if(rawProfilePic) {
            // Convert image object to local URL for preview
            let file_local_URL = URL.createObjectURL(rawProfilePic);
            // Update object with new image
            updatedInfos["user_profilePic"] = file_local_URL;
        }
        
        // Set them globaly (mainly for header)
        setUserInfos(userInfos => ({
            ...userInfos,
            ...updatedInfos
        }));

        // Handle submit and send all updated infos to server 
        customForm.handleSubmit(e);
    }

    /**
	 * For props formatting (ex : create => Create).
	 * @param {str} str String to format. 
	 * @returns {str} Formatted string.
	 */
	const upperFirstChar = (str) => {
		let firstToUpper = str.charAt(0).toUpperCase() + str.slice(1)
		return firstToUpper
	}

	return (
		<>
			<Form ref={formRef} onSubmit={formSubmit}>
				{/* 
					Form style no5 from https://www.sanwebe.com/2014/08/css-html-forms-designs 
					Note: here getItem() get input validation strings "true" or "false" or value null from cookies.
				*/}
				<Legend><Bullet>1</Bullet>Infos Professeur</Legend>
				<Label>Photo :</Label>
				{customForm.picPreviews.teacher_pic ? <AvatarWrapper><Avatar src={customForm.picPreviews.teacher_pic} /></AvatarWrapper> : null }
				{customForm.operation === "update" && !customForm.picPreviews.teacher_pic ? <AvatarWrapper><Avatar src={customForm.inputs.teacher_pic} /></AvatarWrapper> : null}
				<LabelPic htmlFor="upload_teacherPic">Upload Client Pic</LabelPic>
				<Input type="file" id="upload_teacherPic" name="teacher_pic" onChange={customForm.handleChange} />
				{warningBox("teacher_pic", "file")}
				<Label>Prénom * :</Label>
				<Input isValid={customForm.isValid("teacher_fname")} warn_colors={InputWarnNormal} type="text" name="teacher_fname" value={customForm.inputs.teacher_fname || ""} onChange={customForm.handleChange} required />
				{warningBox("teacher_fname", "text")}
				<Label>Nom * :</Label>
				<Input isValid={customForm.isValid("teacher_lname")} warn_colors={InputWarnNormal} type="text" name="teacher_lname" value={customForm.inputs.teacher_lname || ""} onChange={customForm.handleChange} required />
				{warningBox("teacher_lname", "text")}
				<Label>Email :</Label>
				<Input isValid={customForm.isValid("teacher_email")} warn_colors={InputWarnNormal} type="email" name="teacher_email" value={customForm.inputs.teacher_email || ""} onChange={customForm.handleChange} />
				{warningBox("teacher_email", "email")}
				<Label>Téléphone :</Label>
				<Input isValid={customForm.isValid("teacher_phone")} warn_colors={InputWarnNormal} type="tel" name="teacher_phone" value={customForm.inputs.teacher_phone || ""} onChange={customForm.handleChange} />
				{warningBox("teacher_phone", "tel")}
				<Label>Adresse * :</Label>
				<Input isValid={customForm.isValid("teacher_address")} warn_colors={InputWarnNormal} type="text" name="teacher_address" value={customForm.inputs.teacher_address || ""} onChange={customForm.handleChange} required />
				{warningBox("teacher_address", "address")}
                <Label>Code postal * :</Label>
				<Input isValid={customForm.isValid("teacher_postal")} warn_colors={InputWarnNormal} type="text" name="teacher_postal" value={customForm.inputs.teacher_postal || ""} onChange={customForm.handleChange} required />
				{warningBox("teacher_postal", "postal")}
                <Label>Ville * :</Label>
				<Input isValid={customForm.isValid("teacher_city")} warn_colors={InputWarnNormal} type="text" name="teacher_city" value={customForm.inputs.teacher_city || ""} onChange={customForm.handleChange} required />
				{warningBox("teacher_city", "text")}
                <Label>Pays * :</Label>
				<Input isValid={customForm.isValid("teacher_country")} warn_colors={InputWarnNormal} type="text" name="teacher_country" value={customForm.inputs.teacher_country || ""} onChange={customForm.handleChange} required />
				{warningBox("teacher_country", "text")}
                <Legend><Bullet>2</Bullet>Infos Business</Legend>
				<Label>Nom business * :</Label>
				<Input isValid={customForm.isValid("business_name")} warn_colors={InputWarnNormal} type="text" name="business_name" value={customForm.inputs.business_name || ""} onChange={customForm.handleChange} required />
				{warningBox("business_name", "text")}
                <Label>Business website :</Label>
				<Input isValid={customForm.isValid("business_website")} warn_colors={InputWarnNormal} type="text" name="business_website" value={customForm.inputs.business_website || ""} onChange={customForm.handleChange} />
				{warningBox("business_website", "text")}
                <Label>Logo business :</Label>
				{customForm.picPreviews.business_logo ? <AvatarWrapper><Avatar src={customForm.picPreviews.business_logo} /></AvatarWrapper> : null }
				{customForm.operation === "update" && !customForm.picPreviews.business_logo ? <AvatarWrapper><Avatar src={customForm.inputs.business_logo} /></AvatarWrapper> : null}
				<LabelPic htmlFor="upload_logo">Upload Logo</LabelPic>
                <Input type="file" id="upload_logo" name="business_logo" onChange={customForm.handleChange} />
				{warningBox("business_logo", "file")}
                <Legend><Bullet>3</Bullet>Infos Facturation</Legend>
                <Label>No compte bancaire :</Label>
				<Input isValid={customForm.isValid("teacher_bankNumber")} warn_colors={InputWarnNormal} type="text" name="teacher_bankNumber" value={customForm.inputs.teacher_bankNumber || ""} onChange={customForm.handleChange} required />
				{warningBox("teacher_bankNumber", "text")}
                <Label>IBAN * :</Label>
				<Input isValid={customForm.isValid("teacher_iban")} warn_colors={InputWarnNormal} type="text" name="teacher_iban" value={customForm.inputs.teacher_iban || ""} onChange={customForm.handleChange} required />
				{warningBox("teacher_iban", "text")}
                <Label>BIC/SWIFT * :</Label>
				<Input isValid={customForm.isValid("teacher_bicSwift")} warn_colors={InputWarnNormal} type="text" name="teacher_bicSwift" value={customForm.inputs.teacher_bicSwift || ""} onChange={customForm.handleChange} required />
				{warningBox("teacher_bicSwift", "text")}
                <Label>Label taxe * :</Label>
				<Input isValid={customForm.isValid("teacher_taxLabel")} warn_colors={InputWarnNormal} type="text" name="teacher_taxLabel" value={customForm.inputs.teacher_taxLabel || ""} onChange={customForm.handleChange} required />
				{warningBox("teacher_taxLabel", "text")}
                <Label>Taxe * :</Label>
				<Input type="number" name="teacher_tax" value={customForm.inputs.teacher_tax || ""} onChange={customForm.handleChange} required />
				<Input type="submit" value={upperFirstChar(customForm.operation)} />
			</Form>
		</>);
}

export default TeacherFormComponent;