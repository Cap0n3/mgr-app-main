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


const TeacherDetail = () => {

	const [teacherData, setData ] = useState([])
	const [picWidth, setWidth] = useState(0);
	const {authTokens, user} = useContext(AuthContext)
	const teacherPicRef = useRef();
	const navigate = useNavigate();
	const alert = useAlert();
	
	const fetchFail = (err) => {
        alert.show("Une erreur s'est produite !");
		console.error(err);
		navigate("/");
	}

	/**
	 * Request teacher informations to API.
	 */
	useEffect(() => {
		getEntries("http://127.0.0.1:8000/teacher/", authTokens, user).then((data) => {
            console.log(data)
			setData(data);
		}).catch(fetchFail);
	}, []);
	
	/**
	 * This useEffect is here to set height of HeaderWrapper in Client detail page to be exactly equal to square 
	 * client profile pic width at all times.
	 */
	useEffect(() => {
		const teacherPic = teacherPicRef.current;

		const firstRender = () => {
			
			setWidth(teacherPic.teacherWidth)
		}
		const resizeListener = () => {
			if(teacherPic !== null) {
				// Don't know why but clientPic ref is somtimes === null
				setWidth(teacherPic.teacherWidth)
			}
			
		};
		// Get image width on first render
		firstRender();

		// Place an event listener for resize
		window.addEventListener('resize', resizeListener)
		
	}, []);

	// const tabContent = {
	// 	"Infos Facture" : 
	// 		<InfoList>
	// 			<Li><Label offset="150" mobileOffset="100">Prénom :</Label>{teacherData.invoice_fname}</Li>
	// 			<Li><Label offset="150" mobileOffset="100">Nom :</Label>{teacherData.invoice_lname}</Li>
	// 			<Li><Label offset="150" mobileOffset="100">Email :</Label>{teacherData.invoice_email}</Li>
	// 			<Li><Label offset="150" mobileOffset="100">Tél :</Label>{teacherData.invoice_phone}</Li>
	// 			<Li><Label offset="150" mobileOffset="100">Adresse :</Label>{teacherData.invoice_address}</Li>
	// 			<Li><Label offset="150" mobileOffset="100">Ville/Code :</Label>{teacherData.invoice_city}, {teacherData.invoice_postal}</Li>
	// 			<Li><Label offset="150" mobileOffset="100">Pays :</Label>{teacherData.invoice_country}</Li>
	// 		</InfoList>,
	// 	"Facturation" : 
	// 		<InfoList>
	// 			<Li><Label offset="200" mobileOffset="180">Facture numérotée :</Label>{(teacherData.invoice_numbering) ? "Oui" : "Non"}</Li>
	// 			<Li><Label offset="200" mobileOffset="180">Taux horaire :</Label>{teacherData.billing_rate} {teacherData.billing_currency}</Li>
	// 			<Li><Label offset="200" mobileOffset="180">Monnaie :</Label>{teacherData.billing_currency}</Li>
	// 			<Li><Label offset="200" mobileOffset="180">Option paiement :</Label>{teacherData.payment_option}</Li>
	// 		</InfoList>,
	// 	"Notes" : teacherData.notes,
	// }

	// const [active, setActive] = useState(Object.keys(tabContent)[0]);

	return (
		<>
            <MainWrapper>
                <Aside>
                    <ClientPic src={teacherData.teacher_pic} ref={teacherPicRef}/>
                </Aside>
            </MainWrapper>
		</>
	);
}

export default TeacherDetail;