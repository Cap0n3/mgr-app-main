import { createContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({ children }) => {
	
	return (
		<AuthContext.Provider value={{ 'name': 'Alex' }} >
			{/* "children" passes everything between AuthProvider tags => her app div */}
			{children}
		</AuthContext.Provider>
	)
}