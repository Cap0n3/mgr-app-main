import styled from "styled-components";
import { HiOutlineMail, HiPhone } from "react-icons/hi";
import { FaBirthdayCake } from "react-icons/fa";

var DEBUG = false

export const MainWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    ${(DEBUG) ? "border: 1px solid red;" : ""}

    @media screen and (max-width: 960px) {
        flex-direction: column;
        overflow-x: hidden;
        overflow-y: scroll;
    }
`;

// ========================= //
// ========= ASIDE ========= //
// ========================= //

export const Aside = styled.aside`
    width: 400px;
    height: 100%;
    box-sizing: border-box;
    padding: 15px;
    ${(DEBUG) ? "border: 4px solid green;" : ""}

    @media screen and (max-width: 960px) {
        width: 100%;
    }
`;

// For Mobile view
export const HiddenTitle = styled.h1`
    display: none;
    text-align: center;
    margin: 0px 0px 25px 0px;
    padding-top: 0px;
    font-size: 2em;
    ${(DEBUG) ? "border: 1px solid purple;" : ""}

    @media screen and (max-width: 960px) {
        display: block;
    }
`;

export const ClientPic = styled.img`
    width: 100%;
    height: auto;
    border-radius: 8px;
    padding: 0px;
    margin-bottom: 35px;
    ${(DEBUG) ? "border: 1px solid yellow;" : ""}

    @media screen and (max-width: 960px) {
        margin-bottom: 15px;
    }
`;

export const AsideTitle = styled.h3`
    display: ${(props) => 
        (props.mobile === "show" && "none") ||
        (props.mobile === "hide" && "block") ||
        "block"
    };
    overflow: hidden;
    text-align: center;
    text-transform: uppercase;
    margin: 0px 0px 35px 0px;
    color: #5369ac;

    &:before,
    &:after {
        background-color: #333;
        content: "";
        display: inline-block;
        height: 1px;
        position: relative;
        vertical-align: middle;
        width: 50%;
    }
    
    &:before {
        right: 0.5em;
        margin-left: -50%;
    }
    
    &:after {
        left: 0.5em;
        margin-right: -50%;
    }

    @media screen and (max-width: 960px) {
        display: ${(props) => 
            (props.mobile === "show" && "block") ||
            (props.mobile === "hide" && "none") ||
            "block"
        };
        margin: 25px 0px 25px 0px;
    }
`;

export const ClientInfoWrapper = styled.div`
    display: ${(props) => 
        (props.mobile === "show" && "none") ||
        (props.mobile === "hide" && "block") ||
        "block"
    };
    width: 100%;
    margin: 0px;
    padding: 0px;
    ${(DEBUG) ? "border: 1px dotted pink;" : ""}

    @media screen and (max-width: 960px) {
        display: ${(props) => 
            (props.mobile === "show" && "block") ||
            (props.mobile === "hide" && "none") ||
            "block"
        };
        margin-bottom: 35px;
    }
`;

export const InfoList = styled.ul`
    padding: 0px;
    margin: 0px;
    list-style-type: none;
`;

export const Li = styled.li`
    margin: 0px 0px 5px 0px;
    padding: 0px;

    @media screen and (max-width: 960px) {
        font-size: 0.9em;
    }
`;

export const Label = styled.div`
    display: inline-block;
    vertical-align: bottom;
    width: ${(props) => (props.offset ? props.offset : "80")}px;
    text-transform: uppercase;
    font-weight: bold;
    color: #5369ac;
    white-space: nowrap;
    overflow: hidden;
    ${(DEBUG) ? "border: 1px solid brown;" : ""}

    @media screen and (max-width: 960px) {
        width: ${(props) => (props.mobileOffset ? props.mobileOffset : "80")}px;;
    }
`;

// =========================== //
// ========= SECTION ========= //
// =========================== //

export const Section = styled.section`
    width: 100%;
    height: 100%;
    padding: 15px 15px 15px 65px;
    box-sizing: border-box;
    ${(DEBUG) ? "border: 4px solid blue;" : ""}

    @media screen and (max-width: 960px) {
        width: 100%;
        padding: 15px;
    }
`;

export const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    padding: 0px;
    box-sizing: border-box;
    height: ${(props) => props.height}px;
    border-bottom: 1px solid #333;
    margin-bottom: 40px;
    ${(DEBUG) ? "border: 1px solid white;" : ""}

    @media screen and (max-width: 960px) {
        height: 450px;
    }
`;

export const InfosSubWrapper = styled.div`
    ${(DEBUG) ? "border: 1px solid cyan;" : ""}
`;

export const Title = styled.h1`
    display: ${(props) => 
        (props.mobile === "show" && "none") ||
        (props.mobile === "hide" && "block") ||
        "block"
    };
    line-height: 15px; 
    margin: 0px 0px 45px 0px;
    padding-top: 0px;
    font-size: 2em;
    ${(DEBUG) ? "border: 1px solid purple;" : ""}

    @media screen and (max-width: 960px) {
        display: ${(props) => 
            (props.mobile === "show" && "block") ||
            (props.mobile === "hide" && "none") ||
            "block"
        };
        text-align: center;
        margin: 15px 0px 15px 0px;
        padding-top: 0px;
        font-size: 2em;
        line-height: normal; 
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    
    @media screen and (max-width: 960px) {
        justify-content: center;    
    }
`;

export const Tab = styled.button`
    padding: 10px 60px;
    cursor: pointer;
    font-size: 1em;
    color: #5369ac;
    opacity: 0.6;
    background: #11162fff;
    border: 0;
    outline: 0;
    
    ${({ active }) =>
        active &&
        `
        border-bottom: 3px solid #3c81f6ff;
        opacity: 1;
        `
    }

    @media screen and (max-width: 960px) {
        padding: 10px;
        background: #202750ff;
        width: 100%;
        font-size: 0.8em;
    }
`;

export const ContactInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    ${(DEBUG) ? "border: 1px solid yellow;" : ""}
`;

export const EmailIcon = styled(HiOutlineMail)`
    margin-right: 15px;
    font-size: 1.5em;
`;

export const PhoneIcon = styled(HiPhone)`
    margin-right: 15px;
    font-size: 1.5em;
`;

export const BirthdayIcon = styled(FaBirthdayCake)`
    margin-right: 15px;
    font-size: 1.5em;
`;

export const BodyWrapper = styled.div`
    width: 100%;
    height: 300px;
    padding: 0px;
    margin: 0px;
    ${(DEBUG) ? "border: 1px solid brown;" : ""}
`;