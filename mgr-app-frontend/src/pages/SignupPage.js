import React from "react";
import { 
    PageBody,
    LeftSectionWrapper,
    RightSectionWrapper,
    LeftSectionHeader,
    LeftSectionBody,
    Title,
    Image
} from "./pagesStyles/Signup.style";
import Illustration from "../assets/illustration1.svg"

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
                
            </RightSectionWrapper>
        </PageBody>
    );
}

export default SignUp;