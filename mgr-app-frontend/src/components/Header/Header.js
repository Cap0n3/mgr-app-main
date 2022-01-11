import React from "react";
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


const Header = (props) => {
	const [openProfilMenu, setOpenProfilMenu] = useState(false);
	const [openNotifList, setOpenNotifList] = useState(false);
	const profilMenuRef = useRef(null)
	const notifListRef = useRef(null)

	// Check window width
	const isSmallScreen = () => {
		return (window.innerWidth <= 960) ? true : false;
	}

	useEffect(() => {
		/*
		  Alert if clicked on outside of menu to close dropdown menus (profile & notifications).
		 */
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
				<ProfileName>Al Castro</ProfileName>
				<ProfileRole>Admin</ProfileRole>
			</NameRoleWrapper>
		</ProfileWrapper>
		<div>
			<RiArrowDownSLine className="header-menu-dropdown" size="30" onClick={() => setOpenProfilMenu(!openProfilMenu)} />
			<DropMenu isOpen={openProfilMenu} ref={profilMenuRef} rightOffset="30px">
				<ProfileMobileWrapper>
					<ProfileImage src="https://www.rd.com/wp-content/uploads/2021/03/GettyImages-1183822926.jpg" alt="profile-pic" />
					<NameRoleWrapper>
						<ProfileName>Al Castro</ProfileName>
						<ProfileRole>Admin</ProfileRole>
					</NameRoleWrapper>
				</ProfileMobileWrapper>
				<MenuList>
					<MenuItem>Your Profile</MenuItem>
					<MenuItem>Settings</MenuItem>
					<MenuItem>Sign Out</MenuItem>
				</MenuList>
			</DropMenu>
		</div>
	</div>;
};

export default Header;