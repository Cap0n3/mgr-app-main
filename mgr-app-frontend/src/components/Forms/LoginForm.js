import React, { useContext } from "react";
import AuthContext from '../../context/AuthContext';
import { Form, Input} from "./FormStyles/GlobalForm.style";
import { LogoWrapper, AppLogo, AppTitle } from "./FormStyles/LoginForm.style";

const LoginFormComponent = () => {
    let { loginUser } = useContext(AuthContext)
    return (
        <>
            <Form boxWidth="500px" onSubmit={loginUser}>
                <LogoWrapper>
                    <AppLogo />
                    <AppTitle>MGR App</AppTitle>
                </LogoWrapper>
                <Input type="text" name="username" placeholder="Enter Username" />
                <Input type="password" name="password" placeholder="Enter Password" />
                <Input type="submit" value="Login" />
            </Form>
        </>
    );
}

export default LoginFormComponent;