import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import jwt_decode from "jwt-decode";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({ children }) => {
	const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
	const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate();
	
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
			navigate('/')
		} else {
			alert('Something went wrong!')
		}
	}
	
	const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
		navigate('/login')
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
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
			// Set cookie
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }

        if (loading) {
            setLoading(false)
        }
    }

	// Send vars and funcs to context (App component and children)
	let contextData = {
		user: user,
		authTokens: authTokens,
		loginUser: loginUser,
		logoutUser: logoutUser,
	}

	useEffect(()=> {

        if(loading){
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 1

        let interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)

        return () => clearInterval(interval)

    }, [authTokens, loading])

	return (
		<AuthContext.Provider value={contextData} >
			{/* "children" passes everything between AuthProvider tags in App.js => So entire App (app div) */}
			{loading ? null : children}
		</AuthContext.Provider>
	)
}