import "./layout.css";
import { BrowserRouter as Router } from "react-router-dom";
import Container from "./components/Container";
import { FaBars } from "react-icons/fa";
import Sidebar from "./components/Sidebar/Sidebar";
import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
	const [isOpen, setOpen] = useState(false);
	
	return (
		<Router>
			<AuthProvider>
				<div className="App">
					<FaBars
						className={isOpen ? "menuButton menuButton-active" : "menuButton"}
						onClick={() => setOpen(!isOpen)}
					/>
					<Sidebar sideClass={isOpen ? "sidebar sidebar-open" : "sidebar"} setOpenCallback={setOpen} />
					
					{/* Hide content when sidebar open with mobile/tablet, close on click */}
					{
						isOpen === true && window.innerWidth <= 960 ? <div className="overlay" onClick={() => setOpen(!isOpen)}></div> : null
					}
					
					<Container />
				</div>
			</AuthProvider>
		</Router>
	);
}
