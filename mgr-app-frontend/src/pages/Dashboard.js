import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EditButton } from "./Dashboard.style"; 

const Dashboard = () => {
	const [clientData, setData] = useState([])
	const navigate = useNavigate();
	
	useEffect(() => {
		getClients();
	}, [])
	
	const getClients = async () => {
		let response = await fetch('http://127.0.0.1:8000/clients/')
		let data = await response.json()
		console.log(data)
		setData(data)
	}
	
	const deleteClient = async (clientID) => {
		await fetch(`http://127.0.0.1:8000/client/delete/${clientID}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: ""
		})
	}
	
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
			deleteClient(clientID);
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