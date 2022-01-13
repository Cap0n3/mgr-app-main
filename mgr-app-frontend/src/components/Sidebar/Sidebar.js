import React from "react";
import { GoDashboard, GoServer, GoCloudUpload } from "react-icons/go";
import { FaMagento } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5"
import "../../layout.css";
import { StyledLink } from "./Sidebar.elements";

const Sidebar = (props) => {
	// Check window width
	const isSmallScreen = () => {
		return (window.innerWidth <= 960) ? true : false;
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
					<IoLogOutOutline className="logout-icon" size="30" onClick={() => isSmallScreen() ? props.setOpenCallback(false) : null} />
				</div>
				
			</div>
		</>
	);
};

export default Sidebar;
