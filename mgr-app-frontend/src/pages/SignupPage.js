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
} from "./pagesStyles/Signup.style";
import Illustration from "../assets/illustration1.svg"
import SignupForm from "../components/Forms/SignupForm";

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
                <Title>Sign Up !</Title>
                <FormWrapper>
                    <SignupForm />
                </FormWrapper>
            </RightSectionWrapper>
        </PageBody>
    );
}

export default SignUp;