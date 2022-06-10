import React from "react";
import { 
    PageBody,
    LeftSectionWrapper,
    RightSectionWrapper,
    LeftSectionBody,
    Title,
    FormWrapper,
} from "./pagesStyles/SignupPage.style";
import SignupForm from "../components/Forms/SignupForm";
import { DarkColors } from "../Colors"; 

const SignUp = () => {
    return(
        <PageBody>
            <LeftSectionWrapper>
                <LeftSectionBody>
                    <Title>Bienvenue</Title>
                </LeftSectionBody>
            </LeftSectionWrapper>
            <RightSectionWrapper>
                <Title titleColor={DarkColors.Light_Icon}>Inscription</Title>
                <FormWrapper>
                    <SignupForm />
                </FormWrapper>
            </RightSectionWrapper>
        </PageBody>
    );
}

export default SignUp;