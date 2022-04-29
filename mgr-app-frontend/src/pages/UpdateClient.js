import React from "react";
import { useParams } from "react-router-dom";
import ClientFormComponent from "../components/Forms/ClientFormTest";

const UpdateClient = () => {
	const params = useParams();
	
	return (
		<>
			<ClientFormComponent target="update" clientID={params.clientID} />
		</>
	);
}

export default UpdateClient;