import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom'
import AuthContext from "../context/AuthContext";
import { 
	MainWrapper, 
	Aside, 
	Section, 
	ClientPic, 
	ClientInfoWrapper, 
	InfoList, 
	Li, 
	Label,
	HeaderWrapper,
	Title,
	ContactInfo,
	EmailIcon,
	PhoneIcon,
	BirthdayIcon
} from "./pagesStyles/ClientDetail.style";
import { HiOutlineMail } from "react-icons/hi";

const Cloud = () => {
	const [clientData, setData ] = useState([])
	const [picWidth, setWidth] = useState(0);
	const { clientID } = useParams()
	const {authTokens} = useContext(AuthContext)
	const navigate = useNavigate();
	const clientPicRef = useRef();
	
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
			setData(clientData)
		}
		getClient();
	}, [clientID]);
	
	useEffect(() => {
		/**
		 * This function is here to set height of HeaderWrapper in Client detail page to be exactly equal to square 
		 * client profile pic width at all times.
		 */
		const clientPic = clientPicRef.current;

		const firstRender = () => {
			
			setWidth(clientPic.clientWidth)
		}
		const resizeListener = () => {
			if(clientPic !== null) {
				// Don't know why but clientPic ref is somtimes === null
				setWidth(clientPic.clientWidth)
			}
			
		};
		// Get image width on first render
		firstRender();

		// Place an event listener for resize
		window.addEventListener('resize', resizeListener)
		
	}, []);

	return (
		
		<MainWrapper>
			<Aside>
				<ClientPic src={clientData.student_pic} ref={clientPicRef}/>
				<ClientInfoWrapper>
					<InfoList>
						<Li><Label>Cours :</Label>{clientData.instrument}</Li>
						<Li><Label>Jour :</Label>{clientData.lesson_day}</Li>
						<Li><Label>Heure :</Label>{clientData.lesson_hour}</Li>
						<Li><Label>Durée :</Label>{clientData.lesson_duration} min.</Li>
						<Li><Label>Fréqu :</Label>{clientData.lesson_frequency}</Li>
					</InfoList>
				</ClientInfoWrapper>
			</Aside>
			<Section>
				<HeaderWrapper height={picWidth}>
					<Title>{clientData.first_name} {clientData.last_name}</Title>
					<ContactInfo><EmailIcon />{clientData.student_email}</ContactInfo>
					<ContactInfo><PhoneIcon />{clientData.student_phone}</ContactInfo>
					<ContactInfo><BirthdayIcon />{clientData.student_birth}</ContactInfo>
				</HeaderWrapper>
			</Section>
		</MainWrapper>
	);
}

export default Cloud;