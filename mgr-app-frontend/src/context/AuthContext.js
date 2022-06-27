import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import jwt_decode from "jwt-decode";
import { getEntry, fetchFail } from "../functions/ApiCalls";

const AuthContext = createContext();

export default AuthContext;

/**
 * Context data custom type (object returned by `AuthProvider`).
 * @typedef			{Object}		contextData
 * @property		{Object}		user			Infos concerning user & token (isAdmin, id, username, etc...).
 * @property		{Object}		authtoken		Infos concerning authentification token (access, refresh).
 * @property		{function}		loginUser		Function managing user login.
 * @property		{function}		logoutUser		Function managing user logout.
 * @property		{boolean}		loginState		Current state of login.	
 * @property		{Object}		loginAttempt	Object signaling if an login attempt was made and if it was successful.	
 */

/**
 * This context function is used to handle authentification token life cycle.
 * 
 * @param		{Object}		children		App.
 * @returns		{contextData}					All useful context variables related to authentification.
 */
export const AuthProvider = ({ children }) => {
	const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
	const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
	const [loading, setLoading] = useState(true);
	const [loginState, setLoginState] = useState(false);
	const [loginAttempt, setLoginAttempt] = useState({state : true, msg : ""});
	const [userData, setUserData] = useState({});
	const navigate = useNavigate();

	const getUserData = async (endpoint, data) => {
		getEntry(endpoint, data, jwt_decode(data.access), "").then(_data => {
			// Select relevant infos from data
			let infos = {
				user_profilePic : _data[0].teacher_pic,
				user_fname : _data[0].teacher_fname,
				user_lname : _data[0].teacher_lname,
			}
			
			setUserData(userData => ({
				...userData,
				...infos
			}));
		}).catch(fetchFail);
	}
	
	const loginUser = async (e) => {
		e.preventDefault();

		let response = await fetch('http://127.0.0.1:8000/api/token/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ 'username': e.target.username.value, 'password': e.target.password.value })
		});

		let data = await response.json();

		if (response.status === 200) {
			setAuthTokens(data);
			setUser(jwt_decode(data.access));
			// Set Auth Cookie
			localStorage.setItem('authTokens', JSON.stringify(data));
			// Set login state to true
			setLoginState(true);
			// Get user infos (customize link)
			getUserData("http://127.0.0.1:8000/teacher/", data);
			// If an unsuccessful attempt was made before, re-init state to true
			if(loginAttempt.state === false) {
				let updatedStatus = { state : true, msg : ""};
				setLoginAttempt(loginAttempt => ({
					...loginAttempt,
					...updatedStatus
				}));
			}
			navigate('/')
		} else if (response.status === 401) {
			// If unauthorized set state to false (user warning)
			let updatedStatus = { state : false, msg : "Login ou mot de passe invalide !"}
			setLoginAttempt(loginAttempt => ({
				...loginAttempt,
				...updatedStatus
			}));
		} else if (response.status === 400) {
			// Bad request - For example if user forgot to fill a field.
			let updatedStatus = { state : false, msg : "Avez-vous rempli tous les champs ?"}
			setLoginAttempt(loginAttempt => ({
				...loginAttempt,
				...updatedStatus
			}));
		}
		else {
			alert('Something went wrong !\n Response status : ' + response.status);
		}
	}
	
	const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
		setLoginState(false);
        localStorage.removeItem('authTokens');
		navigate('/login');
    }

	const updateToken = async ()=> {
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })

        let data = await response.json()
        
        if (response.status === 200){
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
			// Set cookie
            localStorage.setItem('authTokens', JSON.stringify(data));
			// Set login state
			setLoginState(true);
			// Get user infos (customize link)
			getUserData("http://127.0.0.1:8000/teacher/", data);
        } else {
            logoutUser();
        }

        if (loading) {
            setLoading(false);
        }
    }

	useEffect(()=> {
        if(loading){
            updateToken();
        }

        let fourMinutes = 1000 * 60 * 1

        let interval =  setInterval(()=> {
            if(authTokens) {
                updateToken();
            }
        }, fourMinutes)

        return () => clearInterval(interval)

    }, [authTokens, loading]);

	// Send vars and funcs to context (App component and children)
	let contextData = {
		user: user,
		authTokens: authTokens,
		loginUser: loginUser,
		logoutUser: logoutUser,
		loginAttempt: loginAttempt,
		loginState: loginState,
		userData : userData,
		setUserData : setUserData
	};

	return (
		<AuthContext.Provider value={contextData} >
			{/* "children" passes everything between AuthProvider tags in App.js => So entire App (app div) */}
			{loading ? null : children}
		</AuthContext.Provider>
	)
}