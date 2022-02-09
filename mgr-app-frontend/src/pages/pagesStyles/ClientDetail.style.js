import styled from "styled-components";


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

export const Label = styled.span`
    text-transform: uppercase;
    border: 1px solid red;
    margin-right: 15px;
`;

export const Section = styled.section`
    border: 1px solid blue;
    width: 100%;
    height: 100%;
    padding: 15px;
    box-sizing: border-box;
`;