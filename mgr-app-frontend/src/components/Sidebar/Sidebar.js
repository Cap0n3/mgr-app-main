import React, { useContext } from "react";
import { GoDashboard, GoServer, GoCloudUpload } from "react-icons/go";
import { FaMagento } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5"
import "../../layout.css";
import { StyledLink } from "./Sidebar.elements";
import AuthContext from '../../context/AuthContext';

const Sidebar = (props) => {
	const { logoutUser } = useContext(AuthContext)
	// Check window width
	const isSmallScreen = () => {
		return (window.innerWidth <= 960) ? true : false;
	}
	const logoutEvent = () => {
		if (isSmallScreen()) {
			props.setOpenCallback(false)
		}
		logoutUser()
	}
	return (
		<>
			<div className={props.sideClass}>
				<div className="siteLogo-container">
					<StyledLink to="/">
						<div className="site-logo">
							<FaMagento className="app-logo" size="35" onClick={() => isSmallScreen() ? props.setOpenCallback(false) : null} />
						</div>
					</StyledLink>
					<span>MyApp</span>
				</div>
				<ul className="nav-list-container">
					<li>
						<StyledLink to="/" activeclassname="active">
							<div className="navIcon-wrapper">
								<GoDashboard className="nav-icon" onClick={() => isSmallScreen() ? props.setOpenCallback(false) : null} />
							</div>
							<span>Dashboard</span>
						</StyledLink>
					</li>
					<li>
						<StyledLink to="/billing" activeclassname="active">
							<div className="navIcon-wrapper">
								<GoCloudUpload className="nav-icon" onClick={() => isSmallScreen() ? props.setOpenCallback(false) : null} />
							</div>
							<span>Cloud Uploads</span>
						</StyledLink>
					</li>
					<li>
						<StyledLink to="/notes" activeclassname="active">
							<div className="navIcon-wrapper">
								<GoServer className="nav-icon" onClick={() => isSmallScreen() ? props.setOpenCallback(false) : null} />
							</div>
							<span>Server List</span>
						</StyledLink>
					</li>
				</ul>
				<div className="logoutIcon-wrapper">
					<IoLogOutOutline className="logout-icon" size="30" onClick={logoutEvent} />
				</div>
				
			</div>
		</>
	);
};

export default Sidebar;
