import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from 'react-alert';
import { inputValidation, clearFormCookies, fileValidation } from "./FormValidation";
import { createClient, getClient, updateClient } from "../../functions/ApiCalls";
import { WarningBox, WarnIcon } from "./FormStyles/GlobalForm.style";

// ===================================== //
// =============== UTILS =============== //
// ===================================== //

/**
 * Get all form input properties & current values in an object from submit button event.
 * @param 	{object}	event		Submit button event object.
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
 * @param   {object}  formReference   Form reference object.
 * @returns {object}                  Data object with inputs and its data.
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


// ========================================== //
// ============ FORM CUSTOM HOOK ============ //
// ========================================== //

/**
 * Custom hook for form handling. It can handle default values for inputs, perform input validation and creating/updating values in form.
 *  
 * @typedef Object
 * @param   {string}    formSetup.operation     Operation performed by form (Create or Update ?).
 * @param   {Object}    formSetup.authTokens    Authentification token for server connection.
 * @param   {Object}    formSetup.user          User object for authentification.
 * @param   {string}    formSetup.userID        User ID for retrieving & updating data.
 * @param   {Object}    formSetup.formRef       Form reference used to extract inputs keys dynamically.
 * @param   {Object}     formSetup.radioButtons  Radio button name (should be the same as input name) and initial state value.      
 * @returns                                     Returns all values necessary for form handling.
 */
export const useCustForm = (formSetup) => {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const alert = useAlert()
    const [pic, setPic] = useState();
	const [picPreview, setPicPreview] = useState();
    const [radioState, setRadioState] = useState({});

    /**
	 * What to do if API call failed.
	 * @param   {string}    err     Error message to print.
	 */
	const fetchFail = (err) => {
        alert.show("Une erreur s'est produite !");
		console.error(err);
	}

    /**
     * Define if it'll be the form for data creation or update.
     */
    useEffect(() => {
        if (formSetup.operation === "create") {
            // Set default values
            setInputs(values => ({ ...values}));
        }
        else if (formSetup.operation === "update") {
            // On first render check if it's an update (to get client infos)
            getClient(formSetup.authTokens, formSetup.user, formSetup.userID).then((data) => {
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
    }, [formSetup.operation, formSetup.userID]);

    /**
	 * Clear all form related cookies (used for input validation) when refresh or on first render (just in case).
	 */
	useEffect(() => {
		clearFormCookies(formSetup.formRef.current)
	}, []);

    /**
     * Set initial state of passed radio buttons.
     */
    useEffect(() => {
        setRadioState(radioBtns => ({...formSetup.radioButtons}))
    }, []);

    /**
	 * Display warning messages for user if input is wrong. This function retrieve form cookie and check its status,
	 * if it's set to "false" then it displays the message. Input categories are based on FormValidation.js.
	 * @param {str} inputName		Input name property.
	 * @param {str} inputCategory 	Input category ("file", text", "email", "tel", "address", "postal", "textarea").
	 * @returns {jsx}				JSX with styled-components.
	 */
	 const warningMessage = (inputName, inputCategory) => {
		// Correspond to categories of verification in FormValidation.js
		const warnMessages = {
			"file" : "L'image choisie est trop lourde (max 300 ko) ou non valide !",
			"text" : "Les caractères spéciaux ne sont pas autorisés !",
			"email" : "L'adresse e-mail n'est pas valide !",
			"tel" : "Le numéro n'a pas un format valide (ex : 079 645 23 12).",
			"address" : "L'adresse n'est pas valide !",
			"postal" : "Le numéro postal n'est pas valide !",
			"textarea" : "Les caractères spéciaux ne sont pas autorisés !",
		}
		let cookieStatus = sessionStorage.getItem(inputName)
		return cookieStatus === "false" ? <WarningBox><WarnIcon /><p>{warnMessages[inputCategory]}</p></WarningBox> : null
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
			// Convert string "true"/"false" to actual booleean
			// inputValue = (e.target.id === "true") ? true : false;
			// setInputs(values => ({ ...values, [inputName]: inputValue }))
            inputValue = e.target.value;
            // Convert string "true"/"false" to actual booleean
			inputValue = (inputValue === "true") ? true : false;
            // Set state of changed radio button
            setRadioState(values => ({ ...values, [inputName]: inputValue }))
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
		if (formSetup.operation === "create") {
			
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

			createClient(formSetup.authTokens, formSetup.user, inputs).then().catch(fetchFail);

            // Clear form cookie if success
            clearFormCookies(formSetup.formRef.current)

			// Wait a bit for server to make ressource available
			setTimeout(() => navigate('/'), 100);
		}
		else if (formSetup.operation === "update") {
			updateClient(formSetup.authTokens, formSetup.user, formSetup.userID, inputs).then().catch(fetchFail);
			// Wait a bit for server to make ressource available
			setTimeout(() => navigate('/'), 100);
		}
	}

    // All datas and methods necessary for form handling
    let FormHandling = {
        inputs: inputs,
        operation: formSetup.operation,
        picPreview: picPreview,
        pic: pic,
        radioButtons: radioState,
        warningMessage: warningMessage,
        handleChange: handleChange,
        handleSubmit: handleSubmit
    }
    
    return [FormHandling];
}