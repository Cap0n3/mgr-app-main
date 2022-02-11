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
	InfosSubWrapper,
	Title,
	ButtonGroup,
	Tab,
	ContactInfo,
	EmailIcon,
	PhoneIcon,
	BirthdayIcon,
	BodyWrapper
} from "./pagesStyles/ClientDetail.style";

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

	const types = {
		"Infos Facture" : 
			<InfoList>
				<Li><Label width="150">Prénom :</Label>{clientData.invoice_fname}</Li>
				<Li><Label width="150">Nom :</Label>{clientData.invoice_lname}</Li>
				<Li><Label width="150">Email :</Label>{clientData.invoice_email}</Li>
				<Li><Label width="150">Tél :</Label>{clientData.invoice_phone}</Li>
				<Li><Label width="150">Adresse :</Label>{clientData.invoice_address}</Li>
				<Li><Label width="150">Ville/Code :</Label>{clientData.invoice_city}, {clientData.invoice_postal}</Li>
				<Li><Label width="150">Pays :</Label>{clientData.invoice_country}</Li>
			</InfoList>,
		"Facturation" : 
			<InfoList>
				<Li><Label width="200">Facture numérotée :</Label>{(clientData.nvoice_numbering) ? "Oui" : "Non"}</Li>
				<Li><Label width="200">Taux horaire :</Label>{clientData.billing_rate} {clientData.billing_currency}</Li>
				<Li><Label width="200">Monnaie :</Label>{clientData.billing_currency}</Li>
				<Li><Label width="200">Option paiement :</Label>{clientData.payment_option}</Li>
			</InfoList>,
		"Notes" : clientData.notes,
	}
	const [active, setActive] = useState(Object.keys(types)[0]);

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
						<Li><Label>Niveau :</Label>{clientData.student_level}</Li>
					</InfoList>
				</ClientInfoWrapper>
			</Aside>
			<Section>
				<HeaderWrapper height={picWidth}>
					<InfosSubWrapper>
						<Title>{clientData.first_name} {clientData.last_name}</Title>
						<ContactInfo><EmailIcon />{clientData.student_email}</ContactInfo>
						<ContactInfo><PhoneIcon />{clientData.student_phone}</ContactInfo>
						<ContactInfo><BirthdayIcon />{clientData.student_birth}</ContactInfo>
					</InfosSubWrapper>
					<ButtonGroup>
						{Object.keys(types).map(type => (
							<Tab
								key={type}
								active={active === type}
								onClick={() => setActive(type)}
							>
								{type}
							</Tab>
							))}
					</ButtonGroup>
				</HeaderWrapper>
				<BodyWrapper>
					<p>{types[active]} </p>
				</BodyWrapper>
			</Section>
		</MainWrapper>
	);
}

export default Cloud;