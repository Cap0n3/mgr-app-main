import React from "react";
import { Routes, Route } from "react-router-dom";
import "../layout.css"
import Dashboard from "../pages/Dashboard";
import ClientDetail from "../pages/ClientDetail";
import CreateClient from "../pages/CreateClient";
import UpdateClient from "../pages/UpdateClient";
import Billing from "../pages/Billing";
import Notes from "../pages/Notes";

const Content = () => {
	return(
		<div className="content">
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/client/:clientID" element={<ClientDetail />} />
				<Route path="/client/create" element={<CreateClient />} />
				<Route path="/client/update/:clientID" element={<UpdateClient />} />
				<Route path="/billing" element={<Billing />} />
				<Route path="/notes" element={<Notes />} />
       	</Routes>
		</div>
	);	
}

export default Content;