import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
	const [clientData, setData] = useState([])
	
	useEffect(() => {
		getClients();
	}, [])
	
	const getClients = async () => {
		let response = await fetch('http://127.0.0.1:8000/clients/')
		let data = await response.json()
		console.log(data)
		setData(data)
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
					{clientData.map(info => (
						<tr key={info.id}>
							<td>{info.first_name}</td>
							<td>{info.last_name}</td>
							<td>{info.lesson_day}</td>
							<td>{info.lesson_hour}</td>
							<td>{info.lesson_duration} minutes</td>
							<td>{info.lesson_frequency}</td>
							<td>{info.instrument}</td>
							<td><Link to={`/client/${info.id}`}>detail</Link></td>
						</tr>
					))}
				</tbody>
			</table>		
		</>
	);
}

export default Dashboard;