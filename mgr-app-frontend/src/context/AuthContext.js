import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({ children }) => {
	let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
	let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
	let [loading, setLoading] = useState(true)
	
	const loginUser = async (e) => {
		e.preventDefault()

		let response = await fetch('http://127.0.0.1:8000/api/token/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ 'username': e.target.username.value, 'password': e.target.password.value })
		})
		let data = await response.json()

		if (response.status === 200) {
			setAuthTokens(data)
			setUser(jwt_decode(data.access))
			// Set Cookie
			localStorage.setItem('authTokens', JSON.stringify(data))
			//history.push('/')
		} else {
			alert('Something went wrong!')
		}
		
		// For DEBUG
		console.log("username : " + e.target.username.value)
		console.log("password : " + e.target.password.value)
		console.log("autTokens : " + Object.values(authTokens))
		console.log("user token : " + Object.values(user))
	}
	
	// Send vars and funcs to context (App component and children)
	let contextData = {
		user: user,
		authTokens: authTokens,
		loginUser: loginUser,
		//logoutUser: logoutUser,
	}

	return (
		<AuthContext.Provider value={contextData} >
			{/* "children" passes everything between AuthProvider tags => here it's app div */}
			{children}
		</AuthContext.Provider>
	)
}