import React, { useContext } from "react";
import AuthContext from '../../context/AuthContext';
import { Form, Input, WarningBox, WarnIcon } from "./FormStyles/GlobalForm.style";
import { LogoWrapper, AppLogo, AppTitle, LinkWrapper, LogOrSignLink } from "./FormStyles/LoginForm.style";
import { SignupContext } from "../../App";
import { InputWarnNormal } from "../../Colors";

const LoginFormComponent = () => {
    let { loginUser } = useContext(AuthContext);
    let { loginAttempt } = useContext(AuthContext);
    const { setIsSignup } = useContext(SignupContext);

    /**
     * This func warns user if login attempt was unsuccessful by displaying a warning message.
     * It uses login state passed by AuthContext, if false then it'll display message.
     * @returns     JSX with styled-components.
     */
    const warningMessage = () => {
		return loginAttempt.state ?  null : <WarningBox warn_colors={InputWarnNormal}><WarnIcon warn_colors={InputWarnNormal}/><p>{loginAttempt.msg}</p></WarningBox>
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
                <LinkWrapper>
                    <span>Pas encore de compte ? <LogOrSignLink href={null} onClick={() => setIsSignup(true)}>S'inscrire !</LogOrSignLink></span>
                </LinkWrapper>
                
            </Form>
        </>
    );
}

export default LoginFormComponent;