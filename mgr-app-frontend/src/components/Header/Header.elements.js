import { FaCircle } from "react-icons/fa";
import styled from "styled-components";
import "../../layout.css"

// === DROPMENU (TOOLTIP) === //

export const DropMenu = styled.div`
	display: ${({isOpen}) => (isOpen ? "block" : "none")};
	position: absolute;
	top: 60px;
	right: ${(props) => props.rightOffset};
	padding: 0;
	background-color: #262f59ff;
	min-width: 160px;
	box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
	border: 2px solid #44578eff;
	border-radius: 5px;
	z-index: 50;
	color: white;
	
	/* ARROW - INNER TRIANGLE (border illusion) */
	&:after {
		content: " ";
  		position: absolute;
  		right: 10px;
  		top: -13px;
  		border-top: none;
  		border-right: 13px solid transparent;
  		border-left: 13px solid transparent;
  		border-bottom: 13px solid #262f59ff;
	}

	/* ARROW - OUTER TRIANGLE */
	&:before {
		content: " ";
  		position: absolute;
  		right: 8px;
  		top: -15px;
  		border-top: none;
  		border-right: 15px solid transparent;
  		border-left: 15px solid transparent;
  		border-bottom: 15px solid #44578eff;
	}
	
`;

// Menu design for Profile settings
export const MenuList = styled.ul`
	display: flex;
	flex-direction: column;
	margin: 0;
	padding: 0;
	height: 100%;
	text-decoration: none;
	list-style: none;
	
`;

export const MenuItem = styled.li`
	box-sizing: border-box;	
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	padding: 12px 0px 12px 0px;
	cursor: pointer;

	&:hover {
		background-color: #3c81f6ff;
	}
`;

// Menu design for notifications
export const NotifMenuItem = styled.li`
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	padding: 12px 0px 12px 20px;
	font-size: 0.8em;
	font-style: italic;
	cursor: pointer;

	&:hover {
		background-color: #3c81f6ff;
	}
`;

export const SmallNotifIcon = styled(FaCircle)`
	width: 10px;
	height: 10px;
	color: ${({status}) => 
		(status === "info" && "#549a44ff") || 
		(status === "action" && "#ac1bc0ff") ||
		(status === "warning" && "#FE0100")
	};
	margin-right: 10px;
`;

// === HEADER PROFILE PIC, NAME & ROLE === //

// Wrapper for large/medium screen
export const ProfileWrapper = styled.div`
	display: flex;
	margin-left: var(--notif-icon-spacing);
	cursor: default;

	@media screen and (max-width: 960px) {
		display: none;
	}
`;

// Wrapper for small screen (when inside drop menu tooltip)
export const ProfileMobileWrapper = styled.div`
	display: flex;
	margin: 10px 0px 10px 0px;
	justify-content: center;
	cursor: default;

	@media screen and (min-width: 960px) {
		display: none;
	}
`;

// Elements
export const ProfileImage = styled.img`
	width: 35px;
	height: 35px;
	border-radius: 50%;
	cursor: default;
	overflow: hidden;
`;

export const NameRoleWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 10px;
`;

export const ProfileName = styled.span`
	font-size: 0.8em;
	color: white;
`;

export const ProfileRole = styled.span`
	font-size: 0.7em;
	color: var(--dark-icon);
	text-transform: uppercase;
`;


