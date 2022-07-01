import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from 'react-router-dom'
import AuthContext from "../context/AuthContext";
import { getEntries } from "../functions/ApiCalls";
import { useAlert } from 'react-alert';
import { useNavigate } from "react-router-dom";
import {
	StyledLink,
	PreviousIcon,
	MainWrapper, 
	Aside, 
	Section,
	ClientPic,
    BusinessPicWrapper,
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
    WebsiteIcon,
	BodyWrapper
} from "./pagesStyles/ClientDetail.style";


const TeacherDetail = () => {

	const [teacherData, setData ] = useState([])
	const [picWidth, setWidth] = useState(0);
	const {authTokens, user} = useContext(AuthContext)
	const teacherPicRef = useRef();
	const navigate = useNavigate();
	const alert = useAlert();
	
	/**
	 * This custom `fetchFail()` function handle errors if something went wrong with data transfer to server (API calls). If an error occurs, 
	 * it'll display it to console and cancel page displaying (by navigating back to home).
	 * 
	 * > **Note :** For simple API call error displaying, please use `ApiCalls.js` `fetchFail()` function.
	 * 
	 * @param	{Object}	err		Standard error object.
	 */
	const fetchFail = (err) => {
        alert.show("Une erreur s'est produite !");
		console.error(err);
		navigate("/");
	}

	/**
	 * Request teacher informations to API.
	 */
	useEffect(() => {
		getEntries("http://127.0.0.1:8000/teacher/", authTokens, user).then((response) => {
            //console.log(data)
            // Get array single entry (API pass an array with only one entry - the teacher)
			setData(response["data"][0]);
		}).catch(fetchFail);
	}, []);
	
	/**
	 * This useEffect is here to set height of HeaderWrapper in Client detail page to be exactly equal to square 
	 * client profile pic width at all times.
	 */
	useEffect(() => {
		const teacherPic = teacherPicRef.current;

		const firstRender = () => {
            // clientWidth is the inner width of an element in pixels (standard js)
			setWidth(teacherPic.clientWidth)
		}
		const resizeListener = () => {
			if(teacherPic !== null) {
				// Don't know why but clientPic ref is somtimes === null
				setWidth(teacherPic.clientWidth)
			}
			
		};
		// Get image width on first render
		firstRender();

		// Place an event listener for resize
		window.addEventListener('resize', resizeListener)
		
	}, []);

	const tabContent = {
		"Infos Facture" : 
			<InfoList>
				<Li><Label offset="150" mobileOffset="120">No Compte :</Label>{teacherData.teacher_bankNumber}</Li>
				<Li><Label offset="150" mobileOffset="50">IBAN :</Label>{teacherData.teacher_iban}</Li>
				<Li><Label offset="150" mobileOffset="120">BIC/SWIFT :</Label>{teacherData.teacher_bicSwift}</Li>
                <Li><Label offset="150" mobileOffset="120">Taxe :</Label>{teacherData.teacher_taxLabel}</Li>
                <Li><Label offset="150" mobileOffset="120">Montant taxe :</Label>{teacherData.teacher_tax}%</Li>
                <Li><Label offset="150" mobileOffset="120">Délai paiement :</Label>{teacherData.teacher_dueDays} jours</Li>   
			</InfoList>,
		"Etablissement" : 
			<InfoList>
				<Li><Label offset="150" mobileOffset="120">Nom business :</Label>{teacherData.business_name}</Li>
				<Li><Label offset="150" mobileOffset="120">Website</Label>{teacherData.business_website}</Li>
				<Li><Label offset="150" mobileOffset="120">Logo :</Label><BusinessPicWrapper><ClientPic src={teacherData.business_logo} /></BusinessPicWrapper></Li>
			</InfoList>,
	}

	const [active, setActive] = useState(Object.keys(tabContent)[0]);

	return (
		<>
            <StyledLink to="/"><PreviousIcon /></StyledLink>
            <MainWrapper>
                <Aside>
                    <ClientPic src={teacherData.teacher_pic} ref={teacherPicRef}/>
                    <Title mobile="show">{teacherData.first_name} {teacherData.last_name} <StyledLink to={`/teacher/update/${teacherData.id}`}><EditButton /></StyledLink></Title>
					<AsideTitle mobile="hide">Infos</AsideTitle>
					<ClientInfoWrapper mobile="hide">
						<InfoList>
                            <Li><Label>Nom :</Label>{teacherData.teacher_fname} {teacherData.teacher_lname}</Li>
							<Li><Label>Adresse :</Label>{teacherData.teacher_address}</Li>
							<Li><Label>Ville :</Label>{teacherData.teacher_postal}, {teacherData.teacher_city}</Li>
							<Li><Label>Pays :</Label>{teacherData.teacher_country}</Li>
						</InfoList>
					</ClientInfoWrapper>
				</Aside>
                <Section>
					<HeaderWrapper height={picWidth}>
						<InfosSubWrapper>
							<Title mobile="hide">{teacherData.teacher_fname} {teacherData.teacher_lname}<StyledLink to={`/teacher/update/${teacherData.id}`}><EditButton /></StyledLink></Title>
							<ContactInfo><EmailIcon />{teacherData.teacher_email}</ContactInfo>
							<ContactInfo><PhoneIcon />{teacherData.teacher_phone}</ContactInfo>
							<ContactInfo><WebsiteIcon />{teacherData.business_website}</ContactInfo>
						</InfosSubWrapper>
						{/* Only appears for mobile */}
						<AsideTitle mobile="show">Cours</AsideTitle>
						<ClientInfoWrapper mobile="show">
							<InfoList>
                                <ContactInfo><EmailIcon />{teacherData.teacher_email}</ContactInfo>
                                <ContactInfo><PhoneIcon />{teacherData.teacher_phone}</ContactInfo>
                                <ContactInfo><WebsiteIcon />{teacherData.business_website}</ContactInfo>
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

export default TeacherDetail;