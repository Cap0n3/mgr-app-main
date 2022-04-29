import React, { useRef, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useAlert } from 'react-alert';
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
import { useCustForm } from "./UseCustForm";

/**
 * Form React Component that is used to CREATE or UPDATE client data throught API calls.
 */
const ClientFormComponent = (props) => {
	const alert = useAlert()
	const formRef = useRef();
    const {authTokens, user} = useContext(AuthContext)
	const radioBtnTrue = useRef();
	const radioBtnFalse = useRef();

    const [customForm] = useCustForm({
        operation: props.target,
        authTokens: authTokens,
        user: user,
        userID: props.clientID,
        formRef: formRef
    })
	
    /**
	 * For props formatting (ex : create => Create).
	 * @param {str} str String to format. 
	 * @returns {str} Formatted string.
	 */
	const upperFirstChar = (str) => {
		let firstToUpper = str.charAt(0).toUpperCase() + str.slice(1)
		return firstToUpper
	}
	

	//=========================================//
	//============= FORM HANDLING =============//
	//=========================================//

	return (
		<>
			<Form ref={formRef} onSubmit={customForm.handleSubmit}>
				{/* 
					Form style no5 from https://www.sanwebe.com/2014/08/css-html-forms-designs 
					Note: here getItem() get input validation strings "true" or "false" or value null from cookies.
				*/}
				<Legend><Bullet>1</Bullet>Infos Client</Legend>
				<Label>Photo :</Label>
				{customForm.picPreview &&  customForm.operation === "create" ? <AvatarWrapper><Avatar src={customForm.picPreview} /></AvatarWrapper> : null }
				{customForm.operation === "update" ? <AvatarWrapper><Avatar src={customForm.pic} /></AvatarWrapper> : null}
				<LabelPic htmlFor="img_upload">Upload Client Pic</LabelPic>
				<Input type="file" id="img_upload" name="student_pic" className="ClientPic" onChange={customForm.handleChange} />
				{customForm.warningMessage("student_pic", "file")}
				<Label>Prénom * :</Label>
				<Input isValid={sessionStorage.getItem("first_name")} type="text" name="first_name" value={customForm.inputs.first_name || ""} onChange={customForm.handleChange} required />
				{customForm.warningMessage("first_name", "text")}
				<Label>Nom * :</Label>
				<Input isValid={sessionStorage.getItem("last_name")} type="text" name="last_name" value={customForm.inputs.last_name || ""} onChange={customForm.handleChange} required />
				{customForm.warningMessage("last_name", "text")}
				<Label>Email client :</Label>
				<Input isValid={sessionStorage.getItem("student_email")} type="email" name="student_email" value={customForm.inputs.student_email || ""} onChange={customForm.handleChange} />
				{customForm.warningMessage("student_email", "email")}
				<Label>Téléphone client :</Label>
				<Input isValid={sessionStorage.getItem("student_phone")} type="tel" name="student_phone" value={customForm.inputs.student_phone || ""} onChange={customForm.handleChange} />
				{customForm.warningMessage("student_phone", "tel")}
				<Label>Date de naissance :</Label>
				<Input type="date" name="student_birth" value={customForm.inputs.student_birth || ""} onChange={customForm.handleChange} />
				<Legend><Bullet>2</Bullet>Infos cours</Legend>
				<Label>Jour du cours * :</Label>
				<Select name="lesson_day" defaultValue={"DEFAULT"} value={customForm.inputs.lesson_day} onChange={customForm.handleChange} required>
					<option value="DEFAULT" disabled>Choisir un jour ...</option>
					<option value="Lundi">Lundi</option>
					<option value="Mardi">Mardi</option>
					<option value="Mercredi">Mercredi</option>
					<option value="Jeudi">Jeudi</option>
					<option value="Vendredi">Vendredi</option>
					<option value="Samedi">Samedi</option>
					<option value="Dimanche">Dimanche</option>
				</Select>
				<Label>Heure du cours * :</Label>
				<Input type="time" name="lesson_hour" min="00:00" max="23:00" value={customForm.inputs.lesson_hour || ""} onChange={customForm.handleChange} required/>
				<Label>Durée du cours (min) * :</Label>
				<Input type="number" name="lesson_duration" value={customForm.inputs.lesson_duration || ""} onChange={customForm.handleChange} required />
				<Label>Fréquence du cours * :</Label>
				<Select name="lesson_frequency" defaultValue={"DEFAULT"} value={customForm.inputs.lesson_frequency} onChange={customForm.handleChange} required>
					<option value="DEFAULT" disabled>Choisir une fréquence ...</option>
					<option value="Quotidien">Quotidien</option>
					<option value="Hebdomadaire">Hebdomadaire</option>
					<option value="Bimensuel">Bimensuel</option>
					<option value="Libre">A la carte</option>
				</Select>
				<Label>Instrument :</Label>
				<Input isValid={sessionStorage.getItem("instrument")} type="text" name="instrument" value={customForm.inputs.instrument || ""} onChange={customForm.handleChange} />
				{customForm.warningMessage("instrument", "text")}
				<Label>Niveau :</Label>
				<Select name="student_level" defaultValue={"DEFAULT"} value={customForm.inputs.student_level} onChange={customForm.handleChange}>
					<option value="DEFAULT" disabled>Choisir un niveau ...</option>
					<option value="D1">Débutant 1</option>
					<option value="D2">Débutant 2</option>
					<option value="D3">Débutant 3</option>
					<option value="I1">Intermédiaire 1</option>
					<option value="I2">Intermédiaire 2</option>
					<option value="I3">Intermédiaire 3</option>
					<option value="A1">Avancé 1</option>
					<option value="A2">Avancé 2</option>
					<option value="A3">Avancé 3</option>
				</Select>
				<Legend><Bullet>3</Bullet>Infos Facturation</Legend>
				<Label>Prénom Facturation * :</Label>
				<Input isValid={sessionStorage.getItem("invoice_fname")} type="text" name="invoice_fname" value={customForm.inputs.invoice_fname || ""} onChange={customForm.handleChange} required />
				{customForm.warningMessage("invoice_fname", "text")}
				<Label>Nom Facturation * :</Label>
				<Input isValid={sessionStorage.getItem("invoice_lname")} type="text" name="invoice_lname" value={customForm.inputs.invoice_lname || ""} onChange={customForm.handleChange} required />
				{customForm.warningMessage("invoice_lname", "text")}
				<Label>Email Facturation * :</Label>
				<Input isValid={sessionStorage.getItem("invoice_email")} type="email" name="invoice_email" value={customForm.inputs.invoice_email || ""} onChange={customForm.handleChange} required />
				{customForm.warningMessage("invoice_email", "email")}
				<Label>Téléphone client :</Label>
				<Input isValid={sessionStorage.getItem("invoice_phone")} type="tel" name="invoice_phone" value={customForm.inputs.invoice_phone || ""} onChange={customForm.handleChange} required />
				{customForm.warningMessage("invoice_phone", "tel")}
				<Label>Adresse facturation * :</Label>
				<Input isValid={sessionStorage.getItem("invoice_address")} type="text" name="invoice_address" value={customForm.inputs.invoice_address || ""} onChange={customForm.handleChange} required />
				{customForm.warningMessage("invoice_address", "address")}
				<Label>Code postal * :</Label>
				<Input isValid={sessionStorage.getItem("invoice_postal")} type="text" name="invoice_postal" value={customForm.inputs.invoice_postal || ""} onChange={customForm.handleChange} required />
				{customForm.warningMessage("invoice_postal", "postal")}
				<Label>Ville * :</Label>
				<Input isValid={sessionStorage.getItem("invoice_city")} type="text" name="invoice_city" value={customForm.inputs.invoice_city || ""} onChange={customForm.handleChange} required />
				{customForm.warningMessage("invoice_city", "text")}
				<Label>Pays * :</Label>
				<Input isValid={sessionStorage.getItem("invoice_country")} type="text" name="invoice_country" value={customForm.inputs.invoice_country || ""} onChange={customForm.handleChange} required />
				{customForm.warningMessage("invoice_country", "text")}
				<Legend><Bullet>4</Bullet>Tarification et règlement</Legend>
				<Label>Tarif horaire * :</Label>
				<Input type="number" name="billing_rate" value={customForm.inputs.billing_rate || ""} onChange={customForm.handleChange} required />
				<Label>Monnaie * :</Label>
				<Select name="billing_currency" defaultValue={"DEFAULT"} value={customForm.inputs.billing_currency} onChange={customForm.handleChange} required>
					<option value="DEFAULT" disabled>Choisir une monnaie ...</option>
					<option value="CHF">CHF - Francs suisse</option>
					<option value="EUR">EUR - Euros</option>
				</Select>
				<Label>Mode de règlement * :</Label>
				<Select name="payment_option" defaultValue={"DEFAULT"} value={customForm.inputs.payment_option} onChange={customForm.handleChange} required>
					<option value="DEFAULT" disabled>Choisir un mode de règlement ...</option>
					<option value="Versement">Virement bancaire</option>
					<option value="Bulletin">Bulletin</option>
					<option value="Twint">Twint</option>
					<option value="Cash">En liquide</option>
				</Select>
				<Label>Référence facture * :</Label>
				<RadioLabel htmlFor="numbering_true">Oui</RadioLabel>
				<Input type="radio" ref={radioBtnTrue} id="true" name="invoice_numbering" checked={customForm.inputs.invoice_numbering === true} value={customForm.inputs.invoice_numbering} onChange={customForm.handleChange} required />
				<RadioLabel htmlFor="numbering_false">Non</RadioLabel>
				<Input type="radio" ref={radioBtnFalse} id="false" name="invoice_numbering" checked={customForm.inputs.invoice_numbering === false || customForm.inputs.invoice_numbering === undefined} value={customForm.inputs.invoice_numbering} onChange={customForm.handleChange} />
				<Legend><Bullet>5</Bullet>Notes</Legend>
				<Textarea isValid={sessionStorage.getItem("notes")} name="notes" value={customForm.inputs.notes || ""} onChange={customForm.handleChange}></Textarea>
				{customForm.warningMessage("notes", "textarea")}
				<Input type="submit" value={upperFirstChar(customForm.operation)} />
			</Form>
		</>);
}

export default ClientFormComponent;