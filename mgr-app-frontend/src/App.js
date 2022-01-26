import "./layout.css";
import { BrowserRouter as Router } from "react-router-dom";
import UI from "./UI"
import AuthContext, { AuthProvider } from "./context/AuthContext";

export default function App() {
	return (
		<Router>
			<AuthProvider>
				<div className="App">
					<UI />
				</div>
			</AuthProvider>
		</Router>
	);
}
