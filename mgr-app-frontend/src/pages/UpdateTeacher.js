import React from "react";
import { useParams } from "react-router-dom";
import TeacherFormComponent from "../components/Forms/TeacherForm";

const UpdateTeacher = () => {
	const params = useParams();
	
	return (
		<>
			<TeacherFormComponent target="update" teacherID={params.teacherID} />
		</>
	);
}

export default UpdateTeacher;