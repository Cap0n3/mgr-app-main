import React from "react";
import { Route, Switch } from "react-router-dom";
import "../layout.css"
import Dashboard from "../pages/Dashboard";
import ClientDetail from "../pages/ClientDetail";
import Server from "../pages/Server";
import CreateClient from "../pages/CreateClient";

const Content = () => {
	return(
		<div className="content">
			<Switch>
				<Route path="/" exact component={Dashboard} />
				<Route path="/client/:clientID" component={ClientDetail} />
				<Route path="/create-client" component={CreateClient} />
				<Route path="/server" component={Server} />
       	</Switch>
		</div>
	);	
}

export default Content;