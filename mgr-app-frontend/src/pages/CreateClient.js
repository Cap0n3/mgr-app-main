import React, { useState } from "react";
import { Form, Label, Legend, Input, Select } from "./CreateClient.style"

const CreateClient = () => {
	const [inputs, setInputs] = useState({});
	
	const handleChange = (e) => {
		const inputName = e.target.name;
		const inputValue = e.target.value;
		// See JS spread operator
		setInputs(values => ({ ...values, [inputName]: inputValue }))
	}
	
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(inputs);
	}
	
	return (
		<>
			<Form onSubmit={handleSubmit}>
				{/* Form style no5 from https://www.sanwebe.com/2014/08/css-html-forms-designs */}
				<Legend>Client</Legend>
				<Label>Prénom :</Label>
				<Input type="text" name="first_name" value={inputs.first_name || ""} onChange={handleChange} />
				<Label>Nom :</Label>
				<Input type="text" name="last_name" value={inputs.last_name || ""} onChange={handleChange} />
				<Label>Date de naissance :</Label>
				<Input type="date" name="student_birth" value={inputs.student_birth || ""} onChange={handleChange} />
				<Label>Jour du cours :</Label>
				<Select name="lesson_day" defaultValue={"DEFAULT"} value={inputs.lesson_day} onChange={handleChange}>
					<option value="DEFAULT" disabled>Choisir ...</option>
					<option value="Reading">Reading</option>
					<option value="Painting">Painting</option>
				</Select>
				<Legend>Facturation</Legend>
				<Label>Prénom Facturation :</Label>
				<Input type="text" name="invoice_fname" value={inputs.invoice_fname || ""} onChange={handleChange} />
				<Label>Nom Facturation :</Label>
				<Input type="text" name="invoice_lname" value={inputs.invoice_lname || ""} onChange={handleChange} />
				<Label>Email Facturation :</Label>
				<Input type="email" name="invoice_email" value={inputs.invoice_email || ""} onChange={handleChange} />
				
				<Input type="submit" value="Créer" />
			</Form>
		</>);
}

export default CreateClient;