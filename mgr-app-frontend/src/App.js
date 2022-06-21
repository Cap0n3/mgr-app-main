import { useState } from "react";
import "./layout.css";
import { BrowserRouter as Router } from "react-router-dom";
import UI from "./UI"
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { transitions, positions, type, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from "react-alert-template-basic";
import { createContext } from "react";

// optional configuration for alert popup
const options = {
	// you can also just use 'bottom center'
	position: positions.BOTTOM_CENTER,
	timeout: 8000,
	offset: '10px',
	type: 'error',
	// you can also just use 'scale'
	transition: transitions.SCALE
}

export const SignupContext = createContext();

export default function App() {
	const [ isSignup, setIsSignup] = useState(false);
	const value = { isSignup, setIsSignup };
	
	return (
		<Router>
			<SignupContext.Provider value={value}>
				<AuthProvider>
					<UserProvider>
						<AlertProvider template={AlertTemplate} {...options}>
							<div className="App">
								<UI />
							</div>	
						</AlertProvider>
					</UserProvider>
				</AuthProvider>
			</SignupContext.Provider>
		</Router>
	);
}
