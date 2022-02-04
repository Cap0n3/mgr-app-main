import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthContext';
import { getClients, deleteClient } from "../functions/ApiCalls"
import { ClientTable, HeaderCell, FooterCell, Cell, Line, ProfilePic, EyeIcon, EditIcon, TrashIcon } from "./pagesStyles/Tables.style";

const Dashboard = () => {
	const [clientData, setData] = useState([])
	const { authTokens, user, logoutUser } = useContext(AuthContext)
	const navigate = useNavigate();

	// If API call is success, populate clientData
	const processData = (data) => {
		setData(data)
	}

	// If API call error
	const fetchFail = (err) => {
		console.error(err);
	}
	
	useEffect(() => {	
		// Necessary syntax (.then) for external async funcs
		getClients(authTokens, user, logoutUser).then(processData).catch(fetchFail);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleEditClick = (callToAction, clientID ) => {

		if (callToAction === "detail") {
			// Go to update page (with ID)
			navigate(`/client/${clientID}`);
		}
		else if (callToAction === "update") {
			navigate(`/client/update/${clientID}`);
		}
		else if (callToAction === "delete") {
			deleteClient(authTokens, user, clientID).then().catch(fetchFail);;
			// To refresh client list
			window.location.reload();
		}
	}
	
	return (
		<>
			<Link to="/client/create">Create New Client</Link>
			<ClientTable>
				<thead>
					<tr>
						<HeaderCell></HeaderCell>
						<HeaderCell>CLIENT</HeaderCell>
						<HeaderCell >TEL</HeaderCell>
						<HeaderCell >EMAIL</HeaderCell>
						<HeaderCell >JOUR</HeaderCell>
						<HeaderCell >HEURE</HeaderCell>
						<HeaderCell >FREQUENCE</HeaderCell>
						<HeaderCell colSpan={3} ></HeaderCell>
					</tr>
				</thead>
				<tbody>
					{clientData.map(info => (
						<Line key={info.id}>
							<Cell><ProfilePic src={info.student_pic} /></Cell>
							<Cell>{info.first_name} {info.last_name}</Cell>
							<Cell>{info.student_phone}</Cell>
							<Cell>{info.student_email}</Cell>
							<Cell>{info.lesson_day}</Cell>
							<Cell>{info.lesson_hour.split(':')[0]+ ":" + info.lesson_hour.split(':')[1]}</Cell>
							<Cell>{info.lesson_frequency}</Cell>
							<Cell><EyeIcon size="1.5em" onClick={() => handleEditClick("detail", info.id)}/></Cell>
							<Cell><EditIcon size="1.3em" onClick={() => handleEditClick("update", info.id)}/></Cell>
							<Cell><TrashIcon size="1.3em" onClick={() => handleEditClick("delete", info.id)}/></Cell>
						</Line>
					))}
				</tbody>
				<tfoot>
					<tr>
						<FooterCell></FooterCell>
						<FooterCell></FooterCell>
						<FooterCell></FooterCell>
						<FooterCell></FooterCell>
						<FooterCell></FooterCell>
						<FooterCell></FooterCell>
						<FooterCell></FooterCell>
						<FooterCell colSpan={3}></FooterCell>
					</tr>
				</tfoot>
			</ClientTable>		
		</>
	);
}

export default Dashboard;