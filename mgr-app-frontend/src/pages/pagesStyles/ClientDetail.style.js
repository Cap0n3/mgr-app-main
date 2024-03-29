/**
 * Style used for client detail page and teacher informations.
 */
import styled from "styled-components";
import { Link } from "react-router-dom";
import { HiOutlineMail, HiPhone } from "react-icons/hi";
import { FaBirthdayCake } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io"
import { BiEdit } from "react-icons/bi";
import { CgWebsite } from "react-icons/cg";
import { DarkColors } from "../../Colors";

// To see all borders (design debug)
var DEBUG = false;

export const StyledLink = styled(Link)`
    margin-left: 10px;
    text-decoration: none;
`;

export const PreviousIcon = styled(IoIosArrowBack)`
    color: #44578eff;
    font-size: 1.5em;
    ${(DEBUG) ? "border: 1px solid lightblue;" : ""}
`;

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

export const BusinessPicWrapper = styled.div`
    display: inline-block;
    background-color: ${DarkColors.Light_Foreground};
    width: 100px;
    height: 100px;
    padding: 20px;
    border-radius: 10%;
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
    margin: 0px 0px 10px 0px;
    padding: 0px;

    @media screen and (max-width: 960px) {
        font-size: 0.9em;
    }
`;

export const Label = styled.div`
    display: inline-block;
    vertical-align: top;
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
    ${'' /* align-items: flex-start; */}
    line-height: 10px;
    margin: 0px 0px 55px 0px;
    padding: 0px 0px 0px 0px;
    font-size: 2.5em;
    ${(DEBUG) ? "border: 1px solid purple;" : ""}

    @media screen and (max-width: 960px) {
        display: ${(props) => 
            (props.mobile === "show" && "flex") ||
            (props.mobile === "hide" && "none") ||
            "flex"
        };
        justify-content: center;
        align-items: center;
        margin: 15px 0px 15px 0px;
        padding-top: 0px;
        font-size: 1.5em;
        line-height: normal; 
    }
`;

export const EditButton = styled(BiEdit)`
    display: inline-block;
    color: #44578eff;
    font-size: 0.6em;
    margin: 0px 0px 0px 10px;
    padding: 0px;
    ${(DEBUG) ? "border: 1px solid lightblue;" : ""}

    @media screen and (max-width: 960px) {
        margin: 12px 0px 0px 10px;
        font-size: 1.3em;
    }
`;

// === TABS === //
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

export const WebsiteIcon = styled(CgWebsite)`
    margin-right: 15px;
    font-size: 1.5em;
`;

export const BodyWrapper = styled.div`
    width: 100%;
    min-height: 200px;
    padding: 0px;
    margin: 0px;
    ${(DEBUG) ? "border: 1px solid brown;" : ""}
`;