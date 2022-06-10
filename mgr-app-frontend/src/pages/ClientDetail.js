import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from 'react-router-dom'
import AuthContext from "../context/AuthContext";
import { getEntry } from "../functions/ApiCalls";
import { useAlert } from 'react-alert';
import { useNavigate } from "react-router-dom";
import {
	StyledLink,
	PreviousIcon,
	MainWrapper, 
	Aside, 
	Section,
	ClientPic,
	AsideTitle,
	ClientInfoWrapper, 
	InfoList, 
	Li, 
	Label,
	HeaderWrapper,
	InfosSubWrapper,
	Title,
	EditButton,
	ButtonGroup,
	Tab,
	ContactInfo,
	EmailIcon,
	PhoneIcon,
	BirthdayIcon,
	BodyWrapper
} from "./pagesStyles/ClientDetail.style";


const ClientDetail = () => {

	const [clientData, setData ] = useState([])
	const [picWidth, setWidth] = useState(0);
	const { clientID } = useParams()
	const {authTokens, user} = useContext(AuthContext)
	const clientPicRef = useRef();
	const navigate = useNavigate();
	const alert = useAlert();
	
	const fetchFail = (err) => {
        alert.show("Une erreur s'est produite !");
		console.error(err);
		navigate("/");
	}

	/**
	 * Request client informations to API.
	 */
	useEffect(() => {
		getEntry("http://127.0.0.1:8000/client/", authTokens, user, clientID).then((data) => {
			setData(data);
		}).catch(fetchFail);
	}, [clientID]);
	
	/**
	 * This useEffect is here to set height of HeaderWrapper in Client detail page to be exactly equal to square 
	 * client profile pic width at all times.
	 */
	useEffect(() => {
		const clientPic = clientPicRef.current;

		const firstRender = () => {
			setWidth(clientPic.clientWidth);
		}
		const resizeListener = () => {
			if(clientPic !== null) {
				// Don't know why but clientPic ref is somtimes === null
				setWidth(clientPic.clientWidth);
			}
			
		};
		// Get image width on first render
		firstRender();

		// Place an event listener for resize
		window.addEventListener('resize', resizeListener);	
	}, []);

	const tabContent = {
		"Infos Facture" : 
			<InfoList>
				<Li><Label offset="150" mobileOffset="100">Prénom :</Label>{clientData.invoice_fname}</Li>
				<Li><Label offset="150" mobileOffset="100">Nom :</Label>{clientData.invoice_lname}</Li>
				<Li><Label offset="150" mobileOffset="100">Email :</Label>{clientData.invoice_email}</Li>
				<Li><Label offset="150" mobileOffset="100">Tél :</Label>{clientData.invoice_phone}</Li>
				<Li><Label offset="150" mobileOffset="100">Adresse :</Label>{clientData.invoice_address}</Li>
				<Li><Label offset="150" mobileOffset="100">Ville/Code :</Label>{clientData.invoice_city}, {clientData.invoice_postal}</Li>
				<Li><Label offset="150" mobileOffset="100">Pays :</Label>{clientData.invoice_country}</Li>
			</InfoList>,
		"Facturation" : 
			<InfoList>
				<Li><Label offset="200" mobileOffset="180">Facture numérotée :</Label>{(clientData.invoice_numbering) ? "Oui" : "Non"}</Li>
				<Li><Label offset="200" mobileOffset="180">Taux horaire :</Label>{clientData.billing_rate} {clientData.billing_currency}</Li>
				<Li><Label offset="200" mobileOffset="180">Monnaie :</Label>{clientData.billing_currency}</Li>
				<Li><Label offset="200" mobileOffset="180">Option paiement :</Label>{clientData.payment_option}</Li>
			</InfoList>,
		"Notes" : clientData.notes,
	}

	// Set active tab
	const [active, setActive] = useState(Object.keys(tabContent)[0]);

	return (
		<>
			<StyledLink to="/"><PreviousIcon /></StyledLink>
			<MainWrapper>
				<Aside>
					<ClientPic src={clientData.student_pic} ref={clientPicRef}/>
					<Title mobile="show">{clientData.first_name} {clientData.last_name} <StyledLink to={`/client/update/${clientData.id}`}><EditButton /></StyledLink></Title>
					<AsideTitle mobile="hide">Cours</AsideTitle>
					<ClientInfoWrapper mobile="hide">
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
							<Title mobile="hide">{clientData.first_name} {clientData.last_name}<StyledLink to={`/client/update/${clientData.id}`}><EditButton /></StyledLink></Title>
							<ContactInfo><EmailIcon />{clientData.student_email}</ContactInfo>
							<ContactInfo><PhoneIcon />{clientData.student_phone}</ContactInfo>
							<ContactInfo><BirthdayIcon />{clientData.student_birth}</ContactInfo>
						</InfosSubWrapper>
						{/* Only appears for mobile */}
						<AsideTitle mobile="show">Cours</AsideTitle>
						<ClientInfoWrapper mobile="show">
							<InfoList>
								<Li><Label>Cours :</Label>{clientData.instrument}</Li>
								<Li><Label>Jour :</Label>{clientData.lesson_day}</Li>
								<Li><Label>Heure :</Label>{clientData.lesson_hour}</Li>
								<Li><Label>Durée :</Label>{clientData.lesson_duration} min.</Li>
								<Li><Label>Fréqu :</Label>{clientData.lesson_frequency}</Li>
								<Li><Label>Niveau :</Label>{clientData.student_level}</Li>
							</InfoList>
						</ClientInfoWrapper>
						<ButtonGroup>
							{Object.keys(tabContent).map(type => (
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
						<div>{tabContent[active]} </div>
					</BodyWrapper>
				</Section>
			</MainWrapper>
		</>
	);
}

export default ClientDetail;