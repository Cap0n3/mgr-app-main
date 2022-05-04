import React, { useContext } from "react";
import AuthContext from '../../context/AuthContext';
import { Form, Input, WarningBox, WarnIcon } from "./FormStyles/GlobalForm.style";
import { LogoWrapper, AppLogo, AppTitle } from "./FormStyles/LoginForm.style";

import { SignupContext } from "../../App";

const LoginFormComponent = () => {
    let { loginUser } = useContext(AuthContext);
    let { loginState } = useContext(AuthContext);
    const { isSignup, setIsSignup } = useContext(SignupContext);
    /**
     * This func warns user if login attempt was unsuccessful by displaying a warning message.
     * It uses login state passed by AuthContext, if false then it'll display message.
     * @returns     JSX with styled-components.
     */
    const warningMessage = () => {
		return loginState.state ?  null : <WarningBox><WarnIcon /><p>{loginState.msg}</p></WarningBox>
	}
    return (
        <>
            <Form boxWidth="500px" onSubmit={loginUser}>
                <LogoWrapper>
                    <AppLogo />
                    <AppTitle>MGR App</AppTitle>
                </LogoWrapper>
                {warningMessage()}
                <Input type="text" name="username" placeholder="Enter Username" />
                <Input type="password" name="password" placeholder="Enter Password" />
                <Input type="submit" value="Login" />
                <button onClick={() => setIsSignup(true)}>Sign Up !</button>
            </Form>
        </>
    );
}

export default LoginFormComponent;