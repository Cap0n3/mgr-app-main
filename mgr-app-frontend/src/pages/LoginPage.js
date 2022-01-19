import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
	let { name } = useContext(AuthContext)
	return (
		<div>
			<h1>Hello { name }</h1>
			<form>
				<input type="text" name="username" placeholder="Enter Username" />
				<input type="password" name="password" placeholder="Enter Password" />
				<input type="submit" />
			</form>
		</div>
	)
}

export default LoginPage;