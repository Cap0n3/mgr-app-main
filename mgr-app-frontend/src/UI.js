import "./layout.css";
import { BrowserRouter as Router } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Container from "./components/Container";
import { FaBars } from "react-icons/fa";
import Sidebar from "./components/Sidebar/Sidebar";
import { useState, useContext } from "react";
import AuthContext, { AuthProvider } from "./context/AuthContext";

const UI = () => {
	const [isOpen, setOpen] = useState(false);
	const { authTokens, user } = useContext(AuthContext)
    console.log(user)
    if(user === null) {
        return <LoginPage />
    } else {
        return (
            <>
                {
                    (() => {
                        if (user === null) {
                            return <p>HELLO</p>
                        }
                        else {
                            return <p>GOODBYE</p>
                        }

                    })
                }
                <FaBars
                    className={isOpen ? "menuButton menuButton-active" : "menuButton"}
                    onClick={() => setOpen(!isOpen)}
                />
                <Sidebar sideClass={isOpen ? "sidebar sidebar-open" : "sidebar"} setOpenCallback={setOpen} />
                
                {/* Hide content when sidebar open with mobile/tablet, close on click */}
                {
                    isOpen === true && window.innerWidth <= 960 ? <div className="overlay" onClick={() => setOpen(!isOpen)}></div> : null
                }
                
                <Container />
            </>
	    );
    }
}

export default UI