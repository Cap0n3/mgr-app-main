import React, { useState, useEffect, useContext } from "react";
import { useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom'
import AuthContext from "../context/AuthContext";
import { MainWrapper, Aside, Section, ClientPic, ClientInfoWrapper, InfoList, Li, Label } from "./pagesStyles/ClientDetail.style";

const Cloud = () => {
	const [clientData, setData ] = useState([])
	const { clientID } = useParams()
	const {authTokens} = useContext(AuthContext)
	const navigate = useNavigate();
	
	useEffect(() => {
		const getClient = async() => {
			let response = await fetch(`http://127.0.0.1:8000/client/${clientID}`, {
				method:'GET',
				headers:{
					'Content-Type':'application/json',
					'Authorization':'Bearer ' + String(authTokens.access)
				}
			})
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
		
		<MainWrapper>
			<Aside>
				<ClientPic src={clientData.student_pic} />
				<ClientInfoWrapper>
					<InfoList>
						<Li><Label>Cours :</Label>{clientData.instrument}</Li>
						<Li><Label>Jour :</Label>{clientData.lesson_day}</Li>
						<Li><Label>Heure :</Label>{clientData.lesson_hour}</Li>
						<Li><Label>Durée :</Label>{clientData.lesson_duration} min.</Li>
						<Li><Label>Fréqu. :</Label>{clientData.lesson_frequency}</Li>
					</InfoList>
				</ClientInfoWrapper>
			</Aside>
			<Section></Section>
		</MainWrapper>
	);
}

export default Cloud;