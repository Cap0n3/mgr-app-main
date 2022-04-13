import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { PageBody } from './pagesStyles/Login.style';
import LoginFormComponent from '../components/Forms/LoginForm';

const LoginPage = () => {
	let { loginUser } = useContext(AuthContext)
	return (
		<PageBody>
			<LoginFormComponent />
		</PageBody>
	)
}

export default LoginPage;