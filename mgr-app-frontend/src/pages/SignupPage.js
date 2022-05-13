import React from "react";
import { 
    PageBody,
    LeftSectionWrapper,
    RightSectionWrapper,
    LeftSectionHeader,
    LeftSectionBody,
    Title,
    Image,
    FormWrapper,
} from "./pagesStyles/SignupPage.style";
import Illustration from "../assets/illustration1.svg"
import SignupForm from "../components/Forms/SignupForm";
import { DarkColors } from "../Colors"; 

const SignUp = () => {
    return(
        <PageBody>
            <LeftSectionWrapper>
                <LeftSectionBody>
                    <Title>Bienvenue</Title>
                    {/* <Image src={Illustration} /> */}
                </LeftSectionBody>
            </LeftSectionWrapper>
            <RightSectionWrapper>
                <Title titleColor={DarkColors.Light_Icon}>Sign Up !</Title>
                <FormWrapper>
                    <SignupForm />
                </FormWrapper>
            </RightSectionWrapper>
        </PageBody>
    );
}

export default SignUp;