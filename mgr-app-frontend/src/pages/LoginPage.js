import React, { useContext } from 'react';
import { PageBody } from './pagesStyles/Login.style';
import LoginFormComponent from '../components/Forms/LoginForm';

const LoginPage = () => {
	return (
		<PageBody>
			<LoginFormComponent />
		</PageBody>
	)
}

export default LoginPage;