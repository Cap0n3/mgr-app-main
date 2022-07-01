import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from 'react-alert';
import AuthContext from '../context/AuthContext';
import { getEntries, deleteEntry, fetchFail } from "../functions/ApiCalls";
import { Button } from "./pagesStyles/Global.style";
import { ClientTable, HeaderCell, FooterCell, Cell, Line, ProfilePic, EyeIcon, EditIcon, TrashIcon } from "./pagesStyles/Tables.style";

const Dashboard = () => {
	const [clientData, setData] = useState([])
	const { authTokens, user, logoutUser } = useContext(AuthContext)
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)
	const navigate = useNavigate();
	const alert = useAlert();

	/**
	 * Request all clients info from API.
	 */
	useEffect(() => {	
		// Necessary syntax (.then) for external async funcs
		getEntries("http://127.0.0.1:8000/clients/", authTokens, user, logoutUser).then((response) => {
			// If API call is success, populate clientData
			setData(response["data"]);
		}).catch(err => fetchFail(err, "http://127.0.0.1:8000/clients/"));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		// Listen to window width
		const updateWidth = () => {
			setWindowWidth(window.innerWidth)
		}
		window.addEventListener("resize", updateWidth);
		return () => window.removeEventListener("resize", updateWidth);
	});

	const handleEditClick = (callToAction, clientID ) => {

		if (callToAction === "detail") {
			// Go to update page (with ID)
			navigate(`/client/${clientID}`);
		}
		else if (callToAction === "update") {
			navigate(`/client/update/${clientID}`);
		}
		else if (callToAction === "delete") {
			deleteEntry("http://127.0.0.1:8000/client/delete/", authTokens, user, clientID).then(() => {
				// Refresh client list
				window.location.reload();
			}).catch(err => fetchFail(err, "http://127.0.0.1:8000/client/delete/"));;
		}
	}
	
	return (
		<>
			<Link to="/client/create"><Button btnWidth="30" fontSize="15">Créer un client</Button></Link>
			<ClientTable>
				<thead>
					<tr>
						<HeaderCell></HeaderCell>
						<HeaderCell>{windowWidth <= 720 ? "" : "CLIENT"}</HeaderCell>
						<HeaderCell hide="1120">TEL</HeaderCell>
						<HeaderCell hide="720">EMAIL</HeaderCell>
						<HeaderCell hide="720">JOUR</HeaderCell>
						<HeaderCell hide="780">HEURE</HeaderCell>
						<HeaderCell hide="880">FREQUENCE</HeaderCell>
						<HeaderCell></HeaderCell>
						<HeaderCell hide="720"></HeaderCell>
						<HeaderCell></HeaderCell>
					</tr>
				</thead>
				<tbody>
					{clientData.map(info => (
						<Line key={info.id}>
							<Cell><ProfilePic src={info.student_pic} /></Cell>
							<Cell>{info.first_name} {info.last_name}</Cell>
							<Cell hide="1120">{info.student_phone}</Cell>
							<Cell hide="720">{info.student_email}</Cell>
							<Cell hide="720">{info.lesson_day}</Cell>
							<Cell hide="780">{info.lesson_hour.split(':')[0]+ ":" + info.lesson_hour.split(':')[1]}</Cell>
							<Cell hide="880">{info.lesson_frequency}</Cell>
							<Cell><EyeIcon size="1.5em" onClick={() => handleEditClick("detail", info.id)}/></Cell>
							<Cell hide="720"><EditIcon size="1.3em" onClick={() => handleEditClick("update", info.id)}/></Cell>
							<Cell><TrashIcon size="1.3em" onClick={() => handleEditClick("delete", info.id)}/></Cell>
						</Line>
					))}
				</tbody>
				<tfoot>
					<tr>
						<FooterCell></FooterCell>
						<FooterCell></FooterCell>
						<FooterCell hide="1120"></FooterCell>
						<FooterCell hide="720"></FooterCell>
						<FooterCell hide="720"></FooterCell>
						<FooterCell hide="780"></FooterCell>
						<FooterCell hide="880"></FooterCell>
						<FooterCell></FooterCell>
						<FooterCell hide="720"></FooterCell>
						<FooterCell></FooterCell>
					</tr>
				</tfoot>
			</ClientTable>		
		</>
	);
}

export default Dashboard;