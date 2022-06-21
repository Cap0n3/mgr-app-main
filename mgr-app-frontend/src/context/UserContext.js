import React, { useState, createContext, useContext, useEffect } from "react";
import AuthContext from "./AuthContext";
import { getEntry } from "../functions/ApiCalls";

export const UserContext = createContext();

/**
 * This context provides basic user informations (first name, last name, profile pic) to application and allow a more dynamic updating 
 * of these in comparison with embedded token information from `AuthContext` `contextData` object which will query user infos only on 
 * token refresh and login.
 * 
 * It'll be mainly used for displying recently updated informations by user (names & pic) BEFORE an actual query will eventually be 
 * performed (after a render) and infos stored in server will be displayed (this func is in fact a workaround for quicker displaying 
 * of udpated infos).
 * 
 * > **Note :** it contains only first and last name + profile pic to allow an instantaneous update of these variables. 
 * For username or more important infos, it's better to use `AuthContext` and force a login on user to take into account 
 * updated informations.
 * 
 * @param   {Object}    children     App.
 * @returns 
 */
export const UserProvider = ({ children }) => {
    const {authTokens, user} = useContext(AuthContext);
    const [userInfos, setUserInfos] = useState({});
    const value = {userInfos, setUserInfos};

    /**
	 * This function handle errors if something went wrong with data transfer to server (API calls). If an error occurs, it'll display it to console,
	 * and pass the error message to `FormHandling` (hook return value) object.
	 * @param   {Object}    err     		Error object.
	 * @param	{string}	err.message		Error message.
	 */
	 const fetchFail = (err) => {
        alert.show("Une erreur s'est produite !");
		console.error(err);
	}

    /**
	 * On first render, query infos on teacher
	 */
    useEffect(() => {
        getEntry("http://127.0.0.1:8000/teacher/", authTokens, user, "").then(data => {
            // Select relevant infos from data
            let infos = {
                user_profilePic : data[0].teacher_pic,
                user_fname : data[0].teacher_fname,
                user_lname : data[0].teacher_lname,
            }
            
			setUserInfos(userInfos => ({
                ...userInfos,
                ...infos
            }));
		}).catch(fetchFail);
    }, []);

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};