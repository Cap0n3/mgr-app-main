import styled from "styled-components";
import { DarkColors } from "../../Colors";
import BackImage from "../../assets/img2.jpeg";

export const PageBody = styled.div`
    display: flex;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    background-color: ${DarkColors.Dark_Background};
`;

export const LeftSectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
    width: 50%;
    background-image: url(${BackImage});
    background-color: lightblue;
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover; /* Resize the background image to cover the entire container */
    overflow: scroll;

    @media screen and (max-width: 960px) {
        display: none;
    }
`;

export const LeftSectionHeader = styled.div`
    width: 100%;
    height: 80px;
`;

export const LeftSectionBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

export const RightSectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    width: 50%;
    background-color: ${DarkColors.Dark_Background};

    @media screen and (max-width: 960px) {
        width: 100%;
    }
`;

export const Image = styled.img`
    width: 500px;
`;

export const Title = styled.h1`
    text-transform: uppercase;
`;

export const FormWrapper = styled.div`
    width: 350px;
`;