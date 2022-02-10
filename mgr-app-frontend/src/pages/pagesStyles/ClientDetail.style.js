import styled from "styled-components";
import { HiOutlineMail, HiPhone } from "react-icons/hi";
import { FaBirthdayCake } from "react-icons/fa";

export const MainWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid red;
`;

export const Aside = styled.aside`
    width: 400px;
    height: 100%;
    box-sizing: border-box;
    padding: 15px;
    border: 1px solid green;
`;

export const ClientPic = styled.img`
    width: 100%;
    height: auto;
    border-radius: 8px;
    border: 1px solid yellow;
    margin-bottom: 15px;
`;

export const ClientInfoWrapper = styled.div`
    width: 100%;
    border: 1px solid pink;
`;

export const InfoList = styled.ul`
    padding: 0px;
    margin: 0px;
    list-style-type: none;
`;

export const Li = styled.li`
    margin-bottom: 10px;
`;

export const Label = styled.div`
    display: inline-block;
    width: 80px;
    text-transform: uppercase;
    font-weight: bold;
    border: 1px solid brown;
    white-space: nowrap;
    overflow: hidden;
`;

export const Section = styled.section`
    border: 1px solid blue;
    width: 100%;
    height: 100%;
    padding: 15px;
    box-sizing: border-box;
`;

export const HeaderWrapper = styled.div`
    border: 1px solid white;
    width: 100%;
    padding: 0px;
    box-sizing: border-box;
    height: ${(props) => props.height}px;
`;

export const Title = styled.h1`
    line-height: 15px; 
    margin: 0px 0px 25px 0px;
    padding-top: 0px;
    font-size: 2em;
    border: 1px solid purple;
`;

export const ContactInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid yellow;
    margin-bottom: 10px;
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