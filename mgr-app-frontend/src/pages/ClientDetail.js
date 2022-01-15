import React, { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom'
import { EditButton } from "./Dashboard.style";

const Cloud = () => {
	const [clientData, setData ] = useState([])
	const { clientID } = useParams()
	const navigate = useNavigate();
	
	useEffect(() => {
		const getClient = async() => {
			let response = await fetch(`http://127.0.0.1:8000/client/${clientID}`)
			let clientData = await response.json()
			console.log(clientData)
			setData(clientData)
		}
		getClient();
	}, [clientID]);
	
	const handleUpdateBtn = (e) => {
		let client_ID = e.target.value
		navigate(`/client/update/${client_ID}`);
	}
	
	return (
		<>
			<table>
				<thead>
					<tr>
						<th scope="col">Prénom</th>
						<th scope="col">Nom</th>
						<th scope="col">Jour du cours</th>
						<th scope="col">Heure du cours</th>
						<th scope="col">Durée du cours</th>
						<th scope="col">Fréquence du cours</th>
						<th scope="col">Instument</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{clientData.first_name}</td>
						<td>{clientData.last_name}</td>
						<td>{clientData.lesson_day}</td>
						<td>{clientData.lesson_hour}</td>
						<td>{clientData.lesson_duration} minutes</td>
						<td>{clientData.lesson_frequency}</td>
						<td>{clientData.instrument}</td>
						<td><EditButton name="update" value={clientID} onClick={handleUpdateBtn}>Update</EditButton></td>
					</tr>
				</tbody>
			</table>		
		</>);
}

export default Cloud;