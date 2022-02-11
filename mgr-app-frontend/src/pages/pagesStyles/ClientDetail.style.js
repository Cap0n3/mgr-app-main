import styled from "styled-components";
import { HiOutlineMail, HiPhone } from "react-icons/hi";
import { FaBirthdayCake } from "react-icons/fa";

var DEBUG = false

export const MainWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    ${(DEBUG) ? "border: 1px solid red;" : ""}
`;

// ========================= //
// ========= ASIDE ========= //
// ========================= //

export const Aside = styled.aside`
    width: 300px;
    height: 100%;
    box-sizing: border-box;
    padding: 15px;
    ${(DEBUG) ? "border: 1px solid green;" : ""}
`;

export const ClientPic = styled.img`
    width: 100%;
    height: auto;
    border-radius: 8px;
    padding: 0px;
    margin-bottom: 15px;
    ${(DEBUG) ? "border: 1px solid yellow;" : ""}
`;

export const ClientInfoWrapper = styled.div`
    width: 100%;
    
    margin: 0px;
    padding: 0px;
    ${(DEBUG) ? "border: 1px solid pink;" : ""}
`;

export const InfoList = styled.ul`
    padding: 0px;
    margin: 0px;
    list-style-type: none;
`;

export const Li = styled.li`
    margin: 0px 0px 5px 0px;
    padding: 0px;
`;

export const Label = styled.div`
    display: inline-block;
    vertical-align: bottom;
    width: ${(props) => (props.width ? props.width : "80")}px;
    text-transform: uppercase;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    ${(DEBUG) ? "border: 1px solid brown;" : ""}
`;

// =========================== //
// ========= SECTION ========= //
// =========================== //

export const Section = styled.section`
    width: 70%;
    height: 100%;
    padding: 15px;
    box-sizing: border-box;
    ${(DEBUG) ? "border: 1px solid blue;" : ""}
`;

export const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    padding: 0px;
    box-sizing: border-box;
    height: ${(props) => props.height}px;
    margin-bottom: 20px;
    ${(DEBUG) ? "border: 1px solid white;" : ""}
`;

export const InfosSubWrapper = styled.div`
    ${(DEBUG) ? "border: 1px solid cyan;" : ""}
`;

export const Title = styled.h1`
    line-height: 15px; 
    margin: 0px 0px 25px 0px;
    padding-top: 0px;
    font-size: 2em;
    ${(DEBUG) ? "border: 1px solid purple;" : ""}
`;

export const ButtonGroup = styled.div`
    display: flex;
`;

export const Tab = styled.button`
  font-size: 20px;
  padding: 10px 60px;
  cursor: pointer;
  color: white;
  opacity: 0.6;
  background: #11162fff;
  border: 0;
  outline: 0;

  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid #44578eff;
    opacity: 1;
  `}
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