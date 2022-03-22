import "./layout.css";
import { BrowserRouter as Router } from "react-router-dom";
import UI from "./UI"
import { AuthProvider } from "./context/AuthContext";
import { transitions, positions, type, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from "react-alert-template-basic";

// optional configuration for alert popup
const options = {
	// you can also just use 'bottom center'
	position: positions.TOP_CENTER,
	timeout: 8000,
	offset: '10px',
	type: 'error',
	// you can also just use 'scale'
	transition: transitions.SCALE
}

export default function App() {
	return (
		<Router>
			<AuthProvider>
				<AlertProvider template={AlertTemplate} {...options}>
					<div className="App">
						<UI />
					</div>
				</AlertProvider>
			</AuthProvider>
		</Router>
	);
}
