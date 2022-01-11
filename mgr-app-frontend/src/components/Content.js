import React from "react";
import { Route, Switch } from "react-router-dom";
import "../layout.css"
import Dashboard from "../pages/Dashboard";
import Cloud from "../pages/Cloud";
import Server from "../pages/Server";

const Content = () => {
	return(
		<div className="content">
			<Switch>
				<Route path="/" exact component={Dashboard} />
				<Route path="/cloud" component={Cloud} />
				<Route path="/server" component={Server} />
       		</Switch>
		</div>
	);	
}

export default Content;