import React, { useRef, useContext } from "react";
import AuthContext from "../../context/AuthContext";
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
import { useCustForm } from "../../hooks/useCustomForm/UseCustForm";

/**
 * Form React Component that is used to CREATE or UPDATE client data throught API calls.
 */
const ClientFormComponent = (props) => {
	const formRef = useRef();
    const {authTokens, user} = useContext(AuthContext)

    const [customForm] = useCustForm({
        operation: props.target,
		endpoints: {
			create: "http://127.0.0.1:8000/client/create/",
			update: "http://127.0.0.1:8000/client/update/"
		},
        authTokens: authTokens,
        user: user,
        entryID: props.clientID,
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
			return <WarningBox><WarnIcon /><p>{warnMessages[inputType]}</p></WarningBox>
		}
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
				{warningBox("student_pic", "file")}
				<Label>Prénom * :</Label>
				<Input isValid={customForm.isValid("first_name")} type="text" name="first_name" value={customForm.inputs.first_name || ""} onChange={customForm.handleChange} required />
				{warningBox("first_name", "text")}
				<Label>Nom * :</Label>
				<Input isValid={customForm.isValid("last_name")} type="text" name="last_name" value={customForm.inputs.last_name || ""} onChange={customForm.handleChange} required />
				{warningBox("last_name", "text")}
				<Label>Email client :</Label>
				<Input isValid={customForm.isValid("student_email")} type="email" name="student_email" value={customForm.inputs.student_email || ""} onChange={customForm.handleChange} />
				{warningBox("student_email", "email")}
				<Label>Téléphone client :</Label>
				<Input isValid={customForm.isValid("student_phone")} type="tel" name="student_phone" value={customForm.inputs.student_phone || ""} onChange={customForm.handleChange} />
				{warningBox("student_phone", "tel")}
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
				<Input isValid={customForm.isValid("instrument")} type="text" name="instrument" value={customForm.inputs.instrument || ""} onChange={customForm.handleChange} />
				{warningBox("instrument", "text")}
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
				<Input isValid={customForm.isValid("invoice_fname")} type="text" name="invoice_fname" value={customForm.inputs.invoice_fname || ""} onChange={customForm.handleChange} required />
				{warningBox("invoice_fname", "text")}
				<Label>Nom Facturation * :</Label>
				<Input isValid={customForm.isValid("invoice_lname")} type="text" name="invoice_lname" value={customForm.inputs.invoice_lname || ""} onChange={customForm.handleChange} required />
				{warningBox("invoice_lname", "text")}
				<Label>Email Facturation * :</Label>
				<Input isValid={customForm.isValid("invoice_email")} type="email" name="invoice_email" value={customForm.inputs.invoice_email || ""} onChange={customForm.handleChange} required />
				{warningBox("invoice_email", "email")}
				<Label>Téléphone client :</Label>
				<Input isValid={customForm.isValid("invoice_phone")} type="tel" name="invoice_phone" value={customForm.inputs.invoice_phone || ""} onChange={customForm.handleChange} required />
				{warningBox("invoice_phone", "tel")}
				<Label>Adresse facturation * :</Label>
				<Input isValid={customForm.isValid("invoice_address")} type="text" name="invoice_address" value={customForm.inputs.invoice_address || ""} onChange={customForm.handleChange} required />
				{warningBox("invoice_address", "address")}
				<Label>Code postal * :</Label>
				<Input isValid={customForm.isValid("invoice_postal")} type="text" name="invoice_postal" value={customForm.inputs.invoice_postal || ""} onChange={customForm.handleChange} required />
				{warningBox("invoice_postal", "postal")}
				<Label>Ville * :</Label>
				<Input isValid={customForm.isValid("invoice_city")} type="text" name="invoice_city" value={customForm.inputs.invoice_city || ""} onChange={customForm.handleChange} required />
				{warningBox("invoice_city", "text")}
				<Label>Pays * :</Label>
				<Input isValid={customForm.isValid("invoice_country")} type="text" name="invoice_country" value={customForm.inputs.invoice_country || ""} onChange={customForm.handleChange} required />
				{warningBox("invoice_country", "text")}
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
				<Input type="radio" name="invoice_numbering" checked={customForm.operation === "create" ? customForm.radioButtons["invoice_numbering"] || "" : customForm.inputs.invoice_numbering || ""} value="true" onChange={customForm.handleChange} required />
				<RadioLabel htmlFor="numbering_false">Non</RadioLabel>
				<Input type="radio" name="invoice_numbering" checked={customForm.operation === "create" ? !customForm.radioButtons["invoice_numbering"] || "" : !customForm.inputs.invoice_numbering || ""} value="false" onChange={customForm.handleChange} />  
                <Legend><Bullet>5</Bullet>Notes</Legend>
				<Textarea isValid={customForm.isValid("notes")} name="notes" value={customForm.inputs.notes || ""} onChange={customForm.handleChange}></Textarea>
				{warningBox("notes", "textarea")}
				<Input type="submit" value={upperFirstChar(customForm.operation)} />
			</Form>
		</>);
}

export default ClientFormComponent;