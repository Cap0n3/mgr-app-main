import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from 'react-alert';
import "../../layout.css";
import { FaRegBell } from "react-icons/fa"
import { RiArrowDownSLine } from "react-icons/ri"
import { useState, useRef, useEffect } from "react";
import { 
	DropMenu,
	MenuList,
	MenuItem,
	NotifMenuItem,
	SmallNotifIcon,
	ProfileWrapper,
	ProfileMobileWrapper,
	ProfileImage,
	NameRoleWrapper,
	ProfileName,
	ProfileRole
} from "./Header.elements";
import { isMenuClicked } from "./isMenuClicked";
import AuthContext from "../../context/AuthContext";
import { getEntry } from "../../functions/ApiCalls";


const Header = (props) => {
	const [openProfilMenu, setOpenProfilMenu] = useState(false);
	const [openNotifList, setOpenNotifList] = useState(false);
	const [ teacherData, setData ] = useState([]);
	const {authTokens, user} = useContext(AuthContext);
	const alert = useAlert();
	const profilMenuRef = useRef(null);
	const notifListRef = useRef(null);
	const navigate = useNavigate();

	// Check window width
	const isSmallScreen = () => {
		return (window.innerWidth <= 960) ? true : false;
	}

	/**
	 * This function handle errors if something went wrong with data transfer to server (API calls). If an error occurs, it'll display it to console,
	 * and pass the error message to `FormHandling` (hook return value) object.
	 * @param   {Object}    err     		Error object.
	 * @param	{string}	err.message		Error message.
	 */
	 const fetchFail = (err) => {
        alert.show("Une erreur s'est produite !");
		console.error(err);
	}

	/**
	 * Alert if clicked on outside of menu to close dropdown menus (profile & notifications).
	 */
	useEffect(() => {
		function handleClickOutside(event) {
			if (profilMenuRef.current && !profilMenuRef.current.contains(event.target) && openProfilMenu === true) {
				// PROFILE MENU (Check if clicked oustide, to close menu).
				/* 
					If isMenuClicked() returns "iconClick" (means icon menu has been clicked), then do nothing.
					Else if it returns "outsideClick" (means the click is was made outside) then close menu. 
				*/
				if(isMenuClicked(event, "header-menu-dropdown") === "outsideClick"){
					setOpenProfilMenu(false);
				}
			}
			// NOTIFICATION MENU - same here
			else if (notifListRef.current && !notifListRef.current.contains(event.target) &&  openNotifList === true) {
				if(isMenuClicked(event, "notif-icons") === "outsideClick"){
					setOpenNotifList(false);
				}
			}
		}

		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [profilMenuRef, openProfilMenu, notifListRef, openNotifList]);
	
	/**
	 * Get infos on teacher
	 */
	useEffect(() => {
		getEntry("http://127.0.0.1:8000/teacher/", authTokens, user, "").then(teacherData => {
			setData(teacherData[0]);
			console.log("HELLO")
		}).catch(fetchFail);
	}, []);

	return <div className="header">
		<FaRegBell className="notif-icons" size="25" onClick={() => setOpenNotifList(!openNotifList)} />
		<DropMenu isOpen={openNotifList} ref={notifListRef} rightOffset={() => isSmallScreen() ? "78px" : "190px"}>
			<MenuList>
				<NotifMenuItem><SmallNotifIcon status="info" />Invoice generated</NotifMenuItem>
				<NotifMenuItem><SmallNotifIcon status="action" />Do something !</NotifMenuItem>
				<NotifMenuItem><SmallNotifIcon status="warning" />Error !</NotifMenuItem>
			</MenuList>
		</DropMenu>
		<ProfileWrapper>
			<ProfileImage src="https://www.rd.com/wp-content/uploads/2021/03/GettyImages-1183822926.jpg" alt="profile-pic" />
			<NameRoleWrapper>
				<ProfileName>{ user.isAdmin ? user.username : (teacherData.teacher_fname ? teacherData.teacher_fname.charAt(0) + "." + teacherData.teacher_lname : "UU")}</ProfileName>
				<ProfileRole>{ user.role }</ProfileRole>
			</NameRoleWrapper>
		</ProfileWrapper>
		<div>
			<RiArrowDownSLine className="header-menu-dropdown" size="30" onClick={() => setOpenProfilMenu(!openProfilMenu)} />
			<DropMenu isOpen={openProfilMenu} ref={profilMenuRef} rightOffset="30px">
				<ProfileMobileWrapper>
					<ProfileImage src="https://www.rd.com/wp-content/uploads/2021/03/GettyImages-1183822926.jpg" alt="profile-pic" />
					<NameRoleWrapper>
						<ProfileName>{ user.isAdmin ? user.username : user.fname.charAt(0) + "." + user.lname }</ProfileName>
						<ProfileRole>{ user.role }</ProfileRole>
					</NameRoleWrapper>
				</ProfileMobileWrapper>
				<MenuList>
					<MenuItem onClick={() => navigate("/teacher")}>Your Profile</MenuItem>
					<MenuItem>Settings</MenuItem>
					<MenuItem>Sign Out</MenuItem>
				</MenuList>
			</DropMenu>
		</div>
		{console.log(teacherData.teacher_fname)}
	</div>;
};

export default Header;

// use this for user name profile { user.username ? user.username : user.fname.charAt(0) + "." + user.lname } 