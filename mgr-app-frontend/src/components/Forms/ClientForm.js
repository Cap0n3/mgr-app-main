import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { createClient, getClient, updateClient } from "../../functions/ApiCalls";
import { Form, Label, LabelPic, RadioLabel, Legend, Input, Select, Textarea, AvatarWrapper, Avatar } from "./ClientForm.style"
import { inputValidation, clearFormCookies } from "./FormValidation";
import { getCookie } from "../../functions/cookieUtils";

/**
 * Form React Component that is used to CREATE or UPDATE client data throught API calls.
 */
const ClientFormComponent = (props) => {
	const [inputs, setInputs] = useState({});
	const [pic, setPic] = useState();
	const {authTokens, user} = useContext(AuthContext)
	const navigate = useNavigate();
	const formRef = useRef();
	const radioBtnTrue = useRef();
	const radioBtnFalse = useRef();

	/**
	 * If API call is success, populate clientData & fill form.
	 * @param {object} data	Data object returned by getClient API Call.
	 */
	const processData = (data) => {
		// Fill form inputs with client data
		let clientObject = {
			"student_pic": data.student_pic,
			"first_name": data.first_name,
			"last_name": data.last_name,
			"invoice_fname": data.invoice_fname,
			"invoice_lname": data.invoice_lname,
			"student_birth": data.student_birth,
			"lesson_day": data.lesson_day,
			"lesson_hour": data.lesson_hour,
			"lesson_duration": data.lesson_duration,
			"lesson_frequency": data.lesson_frequency,
			"instrument": data.instrument,
			"student_level": data.student_level,
			"student_email": data.student_email,
			"student_phone": data.student_phone,
			"billing_rate": data.billing_rate,
			"billing_currency": data.billing_currency,
			"invoice_numbering": data.invoice_numbering,
			"invoice_email": data.invoice_email,
			"invoice_phone": data.invoice_phone,
			"invoice_address": data.invoice_address,
			"invoice_postal": data.invoice_postal,
			"invoice_city": data.invoice_city,
			"invoice_country": data.invoice_country,
			"payment_option": data.payment_option,
			"notes": data.notes,
		}

		setInputs(inputs => ({
			...clientObject,
		}))

		setPic(data.student_pic)
	}

	/**
	 * What to do if API call failed.
	 * @param {str} err	Error message to print.
	 */
	const fetchFail = (err) => {
		console.error(err);
	}

	/**
	 * Clear all form related cookies (used for input validation) when refresh or on first render (just in case).
	 */
	useEffect(() => {
		clearFormCookies(formRef.current)
	}, []);

	/**
	 * Define if it'll be the form for creation or update based on passed props.
	 */
	useEffect(() => {
		if (props.target === "create") {
			// Set default value of radio btn "invoice numbering" to false in inputs
			//  => If radio btn isn't touched value is set to "undefined" (which isn't good)
			setInputs(values => ({ ...values, "invoice_numbering": false }))
		}
		else if (props.target === "update") {
			// On first render check if it's an update (to get client infos)
			getClient(authTokens, user, props.clientID).then(processData).catch(fetchFail);
		}
	}, [props.target, props.clientID])
	
	//===========================//
	//====== FORM HANDLING ======//
	//===========================//

	/**
	 * If input is not valid, a cookie will be created with key 'input name' an value 'false'.
	 * Cookie is created in handleChange with inputValidation().
	 * @param {str} inputName Names of input to check
	 * @returns {bol} True if cookie doesn't exists (means input haven't been touched or is OK)
	 */
	const checkInput = (inputName) => {
		let isValid = getCookie(inputName);
		// If cookie doesn't exists, then input is ok.
		if (isValid === null) isValid = true;
		return isValid;
	}

	/**
	 * Get values from inputs on keyboard press and polulate state "inputs".
	 * @param {object} e Event object passed by input
	 */
	const handleChange = (e) => {
		let inputType = e.target.type;
		let inputName = e.target.name;
		let inputValue;
		
		if (inputType === "file") {
			inputValue = e.target.files[0];
			// Convert file object to readable format
			let reader  = new FileReader();
    		reader.onload = function(e) {
				// Set updated image
				setPic(e.target.result);
			}
			reader.readAsDataURL(inputValue);
			// See JS spread operator
			setInputs(values => ({ ...values, [inputName]: inputValue }));
		}
		else if (inputType === "radio") {
			// convert string "true"/"false" to actual booleean
			inputValue = (e.target.id === "true") ? true : false;
			setInputs(values => ({ ...values, [inputName]: inputValue }))
		}
		else {
			// It's a standard input (text, email, tel, select-one, etc...)
			inputValue = e.target.value;

			// Check if input is valid (no special chars etc...)
			inputValidation(inputValue, inputType, inputName);
			
			setInputs(values => ({ ...values, [inputName]: inputValue }));
		}
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		// Evaluate if it's an update or a creation
		if (props.target === "create") {
			createClient(authTokens, user, inputs).then().catch(fetchFail);
			// Wait a bit for server to make ressource available
			setTimeout(() => navigate('/'), 50);
		}
		else if (props.target === "update") {
			//updateClient();
			updateClient(authTokens, user, props.clientID, inputs).then().catch(fetchFail);
			// Wait a bit for server to make ressource available
			setTimeout(() => navigate('/'), 50);
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
			<Form ref={formRef} onSubmit={handleSubmit}>
				{/* Form style no5 from https://www.sanwebe.com/2014/08/css-html-forms-designs */}
				<Legend>{upperFirstChar(props.target)} Client</Legend>
				<Label>Photo :</Label>
				{props.target === "update" ? <AvatarWrapper><Avatar src={pic} /></AvatarWrapper> : null}
				<LabelPic htmlFor="img_upload">Upload Client Pic</LabelPic>
				<Input type="file" id="img_upload" name="student_pic" className="ClientPic" onChange={handleChange} />
				<Label>Prénom * :</Label>
				<Input isValid={checkInput("first_name")} type="text" name="first_name" value={inputs.first_name || ""} onChange={handleChange} />
				<Label>Nom * :</Label>
				<Input isValid={checkInput("last_name")} type="text" name="last_name" value={inputs.last_name || ""} onChange={handleChange} />
				<Label>Email client :</Label>
				<Input isValid={checkInput("student_email")} type="email" name="student_email" value={inputs.student_email || ""} onChange={handleChange} />
				<Label>Téléphone client :</Label>
				<Input isValid={checkInput("student_phone")} type="tel" name="student_phone" value={inputs.student_phone || ""} onChange={handleChange} />
				<Label>Date de naissance :</Label>
				<Input type="date" name="student_birth" value={inputs.student_birth || ""} onChange={handleChange} />
				<Legend>Infos cours</Legend>
				<Label>Jour du cours * :</Label>
				<Select name="lesson_day" defaultValue={"DEFAULT"} value={inputs.lesson_day} onChange={handleChange}>
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
				<Input type="time" name="lesson_hour" min="00:00" max="23:00" value={inputs.lesson_hour || ""} onChange={handleChange} />
				<Label>Durée du cours (min) * :</Label>
				<Input type="number" name="lesson_duration" value={inputs.lesson_duration || ""} onChange={handleChange} />
				<Label>Fréquence du cours * :</Label>
				<Select name="lesson_frequency" defaultValue={"DEFAULT"} value={inputs.lesson_frequency} onChange={handleChange}>
					<option value="DEFAULT" disabled>Choisir une fréquence ...</option>
					<option value="Quotidien">Quotidien</option>
					<option value="Hebdomadaire">Hebdomadaire</option>
					<option value="Bimensuel">Bimensuel</option>
					<option value="Libre">A la carte</option>
				</Select>
				<Label>Instrument :</Label>
				<Input isValid={checkInput("instrument")} type="text" name="instrument" value={inputs.instrument || ""} onChange={handleChange} />
				<Label>Niveau :</Label>
				<Select name="student_level" defaultValue={"DEFAULT"} value={inputs.student_level} onChange={handleChange}>
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
				<Legend>Infos Facturation</Legend>
				<Label>Prénom Facturation * :</Label>
				<Input isValid={checkInput("invoice_fname")} type="text" name="invoice_fname" value={inputs.invoice_fname || ""} onChange={handleChange} />
				<Label>Nom Facturation * :</Label>
				<Input isValid={checkInput("invoice_lname")} type="text" name="invoice_lname" value={inputs.invoice_lname || ""} onChange={handleChange} />
				<Label>Email Facturation * :</Label>
				<Input isValid={checkInput("invoice_email")} type="email" name="invoice_email" value={inputs.invoice_email || ""} onChange={handleChange} />
				<Label>Téléphone client :</Label>
				<Input isValid={checkInput("invoice_phone")} type="tel" name="invoice_phone" value={inputs.invoice_phone || ""} onChange={handleChange} />
				<Label>Adresse facturation * :</Label>
				<Input isValid={checkInput("invoice_address")} type="text" name="invoice_address" value={inputs.invoice_address || ""} onChange={handleChange} />
				<Label>Code postal * :</Label>
				<Input isValid={checkInput("invoice_postal")} type="text" name="invoice_postal" value={inputs.invoice_postal || ""} onChange={handleChange} />
				<Label>Ville * :</Label>
				<Input isValid={checkInput("invoice_city")} type="text" name="invoice_city" value={inputs.invoice_city || ""} onChange={handleChange} />
				<Label>Pays * :</Label>
				<Input isValid={checkInput("invoice_country")} type="text" name="invoice_country" value={inputs.invoice_country || ""} onChange={handleChange} />
				<Legend>Tarification et règlement</Legend>
				<Label>Tarif horaire * :</Label>
				<Input type="number" name="billing_rate" value={inputs.billing_rate || ""} onChange={handleChange} />
				<Label>Monnaie * :</Label>
				<Select name="billing_currency" defaultValue={"DEFAULT"} value={inputs.billing_currency} onChange={handleChange}>
					<option value="DEFAULT" disabled>Choisir une monnaie ...</option>
					<option value="CHF">CHF - Francs suisse</option>
					<option value="EUR">EUR - Euros</option>
				</Select>
				<Label>Mode de règlement * :</Label>
				<Select name="payment_option" defaultValue={"DEFAULT"} value={inputs.payment_option} onChange={handleChange}>
					<option value="DEFAULT" disabled>Choisir un mode de règlement ...</option>
					<option value="Versement">Virement bancaire</option>
					<option value="Bulletin">Bulletin</option>
					<option value="Twint">Twint</option>
					<option value="Cash">En liquide</option>
				</Select>
				<Label>Référence facture * :</Label>
				<RadioLabel htmlFor="numbering_true">Oui</RadioLabel>
				<input type="radio" ref={radioBtnTrue} id="true" name="invoice_numbering" checked={inputs.invoice_numbering === true} value={inputs.invoice_numbering} onChange={handleChange} />
				<RadioLabel htmlFor="numbering_false">Non</RadioLabel>
				<input type="radio" ref={radioBtnFalse} id="false" name="invoice_numbering" checked={inputs.invoice_numbering === false || inputs.invoice_numbering === undefined} value={inputs.invoice_numbering} onChange={handleChange} />
				<Legend>Notes</Legend>
				<Textarea isValid={checkInput("notes")} name="notes" value={inputs.notes || ""} onChange={handleChange}></Textarea>
				<Input type="submit" value={upperFirstChar(props.target)} />
			</Form>
		</>);
}

export default ClientFormComponent;