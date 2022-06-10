import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from 'react-alert';
import { inputValidation, clearFormCookies, fileValidation } from "./FormValidation";
import { createEntry, getEntry, updateEntry, signUpCall } from "../../functions/ApiCalls";
// This one won't be in standalone hook (to remove)
import { SignupContext } from "../../App";

/**
 * # Custom Form Hook
 * 
 * Custom hook for form handling, really handy for profile forms. It can handle default values for radio inputs, perform input validation, 
 * display warning messages and creating/updating values in form. It'll transmit data inputs to server endpoints to create and update 
 * entries in database (thanks to `ApiCalls.js` file).
 * 
 * > **IMPORTANT !** : Name properties of form inputs must have the same name as database model. For example, `first_name` input should relate
 * to `first_name` column in database.
 * 
 * ## Hook Setup
 * 
 * ```js
 * const [customForm] = useCustForm({
 *		operation: "update", // "create", "update" or "signup"
 *		endpoints: { // Server endpoints
 *			create: "http://127.0.0.1:8000/client/create/",
 *			update: "http://127.0.0.1:8000/client/update/",
 *			signup: "http://127.0.0.1:8000/client/signup/"
 *		},
 *		authTokens: authTokens, // Authenfification tokens
 *		user: user, // User information
 *		entryID: props.clientID, // Primary key of entry (for update operation)
 *		navigateTo: "/home",	// URL to navigate to if form submit is a success
 *		formRef: formRef, // Form reference
 *		radioButtons: { // All radio buttons and their initial state
 *			invoice_numbering: false,
 *		}
 * });
 * ```
 * Property `radioButtons` can hold as many radio buttons as desired, name used should be identical to html name property :
 * 
 * ```js
 * radioButtons: {
 * 		<radioBtn1_name>: <initial_state>,
 * 		<radioBtn2_name>: <initial_state>,
 * }
 * ```
 * ## Returned Object
 * Here returned object stored in `customForm` will hold these values & methods. For instance, standard form functions like `handleChange` will handle input 
 * entries and profile pic, `handleSubmit` will perform input validation and send data to server. 
 * 
 * ```js
 * FormHandling = {
 *		inputs: inputs, // Current value of all inputs
 *		operation: formSetup.operation, // Operation
 *		picPreview: picPreview, // Pic image for preview by user
 *		pic: pic, // Pic source URL sent by server (if entry already exists in database)
 *		radioButtons: radioState, // Radio initial state
 *		isValid: isValid, // Check input validation
 *		handleChange: handleChange, // Function to get changes on inputs
 *		handleSubmit: handleSubmit, // Function to submit form data to server
 *		submitError: submitError.message, // Error message if something went wrong durant data transfer
 * }
 * ```
 * 
 * In this example, for accessing values simply do `customForm.<value>`.
 * 
 * - To access `handleChange` function :
 * ```html
 * <input type="text" name="first_name" onChange={customForm.handleChange} />
 * ```
 * - To access `handleSubmit` function :
 * ```html
 * <form onSubmit={customForm.handleSubmit}>
 * ```
 *
 * ## Form Setup
 * 
 * To set up a form, first you must first import `useRef()` hook :
 * 
 * ```js
 * import React, { useRef } from "react";
 * 
 * const myFormComponent = () => {
 * 		const formRef = useRef();
 *		// ... code ... //
 * }
 * ```
 * And then insert form in component return like this :
 * 
 * ```js
 * return(
 * 	<>
 * 		<form ref={formRef} onSubmit={customForm.handleSubmit}>
 * 			<input type="submit" value={customForm.operation} />
 * 		</form>
 * 	</>
 * );
 * ```
 * 
 * ### Basic input
 * 
 * - To set up a simple text input with user input validation and warning message for user :
 * ```js
 * <input isValid={isValid("first_name")} type="text" name="first_name" value={customForm.inputs.first_name || ""} onChange={customForm.handleChange} required />
 * ```
 * > **Note :** `isValid` property is not mandatory, it can be used to change appearance of input if validation is not successful (see `isValid()` function hook function below).
 * 
 * ### Image file input 
 * 
 * For now, only images are handled by file inputs in this custom hook. Once an image file input is set up, it can preview images as soon as 
 * it is choosen by user or display an URL received by a remote server.
 * 
 * - To set up a file input to choose image :
 * ```js
 * <input type="file" id="img_upload" name="student_pic" className="ClientPic" onChange={customForm.handleChange} />
 * ```
 * > **IMPORTANT !** Name property of image file input must contain strings "image", "pic", "picture", "img" (ex : "student_pic" or "student_image").
 * 
 * #### Image preview & displaying
 * 
 * To set up a profile picture with preview here's the way to go.
 * 
 * - For "create" entry operation with a preview of choosen image :
 * ```js
 * {customForm.picPreview &&  customForm.operation === "create" ? <img src={customForm.picPreview} /> : null }
 * ```
 * 
 * - For "update" operation with displaying of image URL received by server :
 * ```js
 * {customForm.operation === "update" ? <img src={customForm.pic} /> : null}
 * ```
 * 
 * #### Radio buttons
 * 
 * - For accessing initial state of radio button and perform updates on value from JSX :
 * ```js
 * <input type="radio" name="invoice_numbering" checked={customForm.operation === "create" ? customForm.radioButtons["invoice_numbering"] || "" : customForm.inputs.invoice_numbering || ""} value="true" onChange={customForm.handleChange} />
 * ```
 *
 * #### Select
 * 
 * - For select box :
 * ```js
 * <Select name="lesson_frequency" defaultValue={"DEFAULT"} value={customForm.inputs.lesson_frequency} onChange={customForm.handleChange} required>
 *		<option value="DEFAULT" disabled>Choisir une fréquence ...</option>
 *		<option value="Quotidien">Quotidien</option>
 *		<option value="Hebdomadaire">Hebdomadaire</option>
 *		<option value="Bimensuel">Bimensuel</option>
 *		<option value="Libre">A la carte</option>
 *</Select>
 * ```
 * 
 * ## Input validation
 * 
 * The function `isValid(<input_name>)` can be used for input validation, it returns validation state of selected input. 
 * 
 * State can be either :
 * 
 * - `true` - Input content is valid. 
 * - `false` - Input content is not valid.
 * - `null`- Input is empty.
 * 
 * To display a simple warning message for user using `isValid()`, add this block below input (or elsewhere) :
 * 
 * ```js
 * <input type="text" name="first_name" />
 * {(customForm.isValid("first_name") || customForm.isValid("first_name") === null) ? "" : <p>Input is not valid !</p>}
 * ```
 * > **Note :** Here nothing will be displayed if input is either `true` or `null`.
 * 
 * If JSX to be displayed is more complex, it can be a good idea to use a custom function to verify `isValid` returned value :
 * 
 * ```js
 * const warningBox = (inputName) => {
 * 		let isVal = customForm.isValid(inputName);
 * 		if(isVal || isVal === null) {
 * 			return null;
 * 		}
 * 		else if (!isVal) {
 * 			return <p>Not Valid !</p>
 * 		}
 * }
 * ```
 * 
 * And then simply display message in component return :
 * 
 * ```js
 * <input type="text" name="first_name" />
 * {warningBox("first_name")}
 * ```
 * 
 * ## Error message
 * 
 * - If something is wrong with data transfer to server an alert will be automatically displayed, but if you want to get exact error message do :
 * ```js
 * <p>{customForm.submitError ? customForm.submitError : "" }</p>
 * ```
 * 
 * ## Parameters 
 * 
 * @typedef Object
 * @param   {string}    formSetup.operation     Operation performed by form (can be either "create" or "update").
 * @param	{Object}	formSetup.endoints		Object containing create and update operation endoints.
 * @param   {Object}    formSetup.authTokens    Authentification token for server connection.
 * @param   {Object}    formSetup.user          User object for authentification.
 * @param   {string}    formSetup.entryID       Entry primary key for retrieving & updating data.
 * @param	{string}	formSetup.navigateTo	Where to go if form submit is a success.
 * @param   {Object}    formSetup.formRef       Form reference used to extract inputs keys dynamically.
 * @param   {Object}    formSetup.radioButtons  Radio button name (should be the same as input name) and initial state value.
 * @returns                                     Returns all values necessary for form handling.
 */
export const useCustForm = (formSetup) => {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const alert = useAlert();
    const [pic, setPic] = useState();
	const [picPreview, setPicPreview] = useState();
    const [radioState, setRadioState] = useState({});
	const [submitError, setSubmitError] = useState();
	const { setIsSignup } = useContext(SignupContext);

	// ========= UTILS ========= //

	/**
	 * Get all form input properties & current values in an object from submit button event.
	 * @param 	{Object}	event		Submit button event object.
	 * @returns {array}					Array containing input objects with name, type & current value.		
	 */
	const getFormInputInfos = (event) => {
		let inputsArray = []

		// Get input names dynamically
		for(let i=0; i < 100; i++) {
			let inputInfos = {
				"name" : "",
				"type" : "",
				"value" : ""
			};

			let input = event.target[i];
			// Will reach undefined for other properties present in event target.
			if(input === undefined){
				break;
			}
			if (input.type === "radio") {
				// Get only checked button
				if (input.checked === true) {
					inputInfos["name"] = input.name;
					inputInfos["type"] = input.type;
					inputInfos["value"] = input.value;
					inputsArray.push(inputInfos);
				}
			}
			else {
				inputInfos["name"] = input.name;
				inputInfos["type"] = input.type;
				inputInfos["value"] = input.value;
				inputsArray.push(inputInfos);
			}	
		}
		return inputsArray;
	}

	/**
	 * This function creates a data object which will be used during update opreation to populate form inputs with received data from server.
	 * In order achieve this, it's take all input names from a form reference object and use it to create keys of data object.
	 * @param   {Object}  formReference   Form reference object.
	 * @returns {Object}                  Data object with inputs and its data.
	 */
	const createDataObject = (formReference, data) => {
		let htmlElements = [];
		let allInputNames = [];
		// Extract all inputs from form
		let keys = Object.keys(formReference);
		keys.forEach((key, index) => {
			htmlElements.push(formReference[key]);
		})
		// Put name properties of inputs in an unfiltered list
		for(let i = 0; i < htmlElements.length; i++) {
			let inputName = htmlElements[i].name;
			if(inputName !== undefined && inputName !== "") {
				allInputNames.push(inputName);
			}
		}

		// Remove any duplicates from list (value must be unique)
		let filteredNames = [...new Set(allInputNames)];
		
		// Generate object with corresponding data and return
		let dataObj = {};
		for (let i = 0; i < filteredNames.length; i++) {
			dataObj[filteredNames[i]] = data[filteredNames[i]];
		}
		return dataObj;
	}

    /**
	 * This function handle errors if something went wrong with data transfer to server (API calls). If an error occurs, it'll display it to console,
	 * and pass the error message to `FormHandling` (hook return value) object.
	 * @param   {Object}    err     		Error object.
	 * @param	{string}	err.message		Error message.
	 */
	const fetchFail = (err) => {
        alert.show("Une erreur s'est produite !");
		console.error(err);
		setSubmitError(err);
	}

	// ========= SETUP ========= //

    /**
     * Define if it'll be the form for data creation, update or signup and populate input with default values.
     */
    useEffect(() => {
        if (formSetup.operation === "create" || formSetup.operation === "signup") {
            // Set initial state of radio buttons
			setRadioState(radioBtns => ({...formSetup.radioButtons}));
			// Set inputs for radio buttons
			setInputs(radioBtns => ({...formSetup.radioButtons}));
			// Set text inputs (to do ...)
            setInputs(values => ({ ...values}));
        }
        else if (formSetup.operation === "update") {
            // On first render check if it's an update (to get client infos)
            getEntry("http://127.0.0.1:8000/client/", formSetup.authTokens, formSetup.user, formSetup.entryID).then((data) => {
                let serverData = createDataObject(formSetup.formRef.current, data)
                // Fill inputs with data received from server
                setInputs(inputs => ({
                    ...serverData,
                }))
                // Set profile picture
                // NOT UNIVERSAL !!! Think of a better way
                setPic(serverData["student_pic"])
            }).catch(fetchFail);
        }
        else {
            console.error("No operation has been set ! Please choose either create or update.")
        }
    }, [formSetup.operation, formSetup.entryID]);

    /**
	 * Clear all form related cookies (used for input validation) when refresh or on first render (just in case).
	 */
	useEffect(() => {
		clearFormCookies(formSetup.formRef.current)
	}, []);

	// ========= CORE FUNCTIONS ========= //

	const isValid = (inputToCheck) => {
		let isVal = sessionStorage.getItem(inputToCheck);
		// Convert isVal to true boolean
		if(isVal === "true") {
			return true;
		}
		else if(isVal === "false") {
			return false;
		}
		else {
			return null;
		}
	}
    
	/**
	 * Get values from inputs on keyboard press and polulate state "inputs".
	 * @param {Object}  e   Event object passed by input.
	 */
	const handleChange = (e) => {
		let inputType = e.target.type;
		let inputName = e.target.name;
		let inputValue;
		
		if (inputType === "file") {
			inputValue = e.target.files[0];

			/* 
				Condition is here to avoid undefined value to be passed further.
				Happens if you first choose invalid file, have popup alert and then 
				press upload button and finally click on cancel without choosing new file.
			*/
			if (inputValue === undefined){
				return;
			}

			fileValidation(inputValue, inputName).then((isValid) => {
				if(isValid === true)
				{
					// Set image preview for user
					let file_local_URL = URL.createObjectURL(inputValue);
					setPicPreview(file_local_URL)
					
					// Convert file object to readable format (for upload to server)
					let reader  = new FileReader();
					reader.onload = (e) => {
						// Set updated image
						setPic(e.target.result);
					}
					reader.readAsDataURL(inputValue);

					// See JS spread operator
					setInputs(values => ({ ...values, [inputName]: inputValue }));	
				}
				else if(isValid === false)
				{
					if(inputValue.size > 300000) {
						alert.show("Image trop lourde !");
					}
					else {
						alert.show("Image non valide !");
					}
					/* 
						Nasty trick to force re-render on file input to take into
						account set cookie and display warning message below input.
					*/
					setPicPreview(null);

					// Clear value of file input
					e.target.value = null;
				}
			});		
		}
		else if (inputType === "radio") {
            inputValue = e.target.value;
            // Convert string "true"/"false" to actual booleean
			inputValue = (inputValue === "true") ? true : false;
            // Set state of changed radio button
            setRadioState(values => ({ ...values, [inputName]: inputValue }))
			// Set input value
            setInputs(values => ({ ...values, [inputName]: inputValue }))
		}
		else {
			// Then it's a standard input (text, email, tel, select-one, etc...)
			inputValue = e.target.value;

			// Check if input is valid (no special chars etc...)
			inputValidation(inputValue, inputType, inputName);
			
			setInputs(values => ({ ...values, [inputName]: inputValue }));
		}
	}

    /**
     * This function first check if all form verification cookies are set to true and if so, send data to server and clear cookies.
     * @param   {Object}   event   Form submit event.  
     */
    const handleSubmit = (event) => {
		event.preventDefault();

		// Evaluate if it's an update or a creation
		if (formSetup.operation === "create" || formSetup.operation === "signup") {
			
			// Get inputs infos from submit button
			let allInputs = getFormInputInfos(event);
			
			let wrongInputs = []

			// Check if an input cookie is set to false (last input verification before sending)
			allInputs.forEach(element => {
				if(sessionStorage.getItem(element.name) !== null) {
					if(sessionStorage.getItem(element.name) === "false") {
						wrongInputs.push(element.name);
					}
				}
			})

			// Warn user if inputs are wrong and quit function (without sending data)
			if (wrongInputs.length !== 0){
				alert.error("Des entrées ne sont pas valides !")
				return;
			}
			
			// Make API call to server
			if (formSetup.operation === "create") {
				createEntry(formSetup.endpoints.create, formSetup.authTokens, formSetup.user, inputs).then(() => {
					// If success, clear form cookies & go to dashboard
					clearFormCookies(formSetup.formRef.current)
					navigate(formSetup.navigateTo);
				}).catch(fetchFail);
			}
			else if (formSetup.operation === "signup") {
				// First check if password and confirmation match
				if(inputs.password !== inputs.confirmPasswd) {
					alert.error("Les mots de passe pas identiques");
					return;
				}
				signUpCall(formSetup.endpoints.signup, inputs).then(() => {
					// If success, clear form cookies & go to dashboard
					clearFormCookies(formSetup.formRef.current)
					setIsSignup(false);
					//navigate(formSetup.navigateTo);
				}).catch(fetchFail);
			}
		}
		else if (formSetup.operation === "update") {
			updateEntry(formSetup.endpoints.update, formSetup.authTokens, formSetup.user, formSetup.entryID, inputs).then(() => {
				// If success, clear form cookies & go to dashboard
				clearFormCookies(formSetup.formRef.current)
				navigate(formSetup.navigateTo);
			}).catch(fetchFail);
		}
	}

    // All datas and methods necessary for form handling
    let FormHandling = {
        inputs: inputs,
        operation: formSetup.operation,
        picPreview: picPreview ? picPreview : null,
        pic: pic ? pic : null,
        radioButtons: radioState ? radioState : null,
		isValid: isValid,
        handleChange: handleChange,
        handleSubmit: handleSubmit,
		submitError: submitError ? submitError.message : null,
    }

    return [FormHandling];
}