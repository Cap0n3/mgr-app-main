import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthContext';
import { getClients, deleteClient } from "../functions/ApiCalls"
import { EditButton } from "./Dashboard.style"; 

const Dashboard = () => {
	const [clientData, setData] = useState([])
	const { authTokens, user, logoutUser } = useContext(AuthContext)
	const navigate = useNavigate();
	
	useEffect(() => {	
		// If getClient() is a success	
		let processData = (data) => {
			setData(data)
		}

		// If error occured catch it
		let fetchFail = (err) => {
			console.log(err);
		}

		// Necessary syntax (.then) for external async funcs
		getClients(authTokens, user, logoutUser).then(processData).catch(fetchFail);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleEditClick = (e) => {
		let btnName = e.target.name
		let clientID = e.target.value

		if (btnName === "detail") {
			// Go to update page (with ID)
			navigate(`/client/${clientID}`);
		}
		else if (btnName === "update") {
			navigate(`/client/update/${clientID}`);
		}
		else if (btnName === "delete") {
			deleteClient(authTokens, clientID);
			// To refresh client list
			window.location.reload();
		}
	}
	
	return (
		<>
			<Link to="/client/create">Create New Client</Link>
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
					{clientData.map(info => (
						<tr key={info.id}>
							<td>{info.first_name}</td>
							<td>{info.last_name}</td>
							<td>{info.lesson_day}</td>
							<td>{info.lesson_hour}</td>
							<td>{info.lesson_duration} minutes</td>
							<td>{info.lesson_frequency}</td>
							<td>{info.instrument}</td>
							<td><EditButton name="detail" value={info.id} onClick={handleEditClick}>Detail</EditButton></td>
							<td><EditButton name="update" value={info.id} onClick={handleEditClick}>Update</EditButton></td>
							<td><EditButton name="delete" value={info.id} onClick={handleEditClick}>Delete</EditButton></td>
						</tr>
					))}
				</tbody>
			</table>		
		</>
	);
}

export default Dashboard;