import styled from "styled-components";
import { FaMagento } from "react-icons/fa";
import { DarkColors } from "../../../Colors";

export const LogoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 30px;
    
`;

export const AppLogo = styled(FaMagento)`
    width: 80px;
    height: auto;
    margin: auto;
    margin: 20px 0px 20px 0px;
    color: ${DarkColors.Neon_Blue}
`;

export const AppTitle = styled.h1`
    margin: 0;
    padding: 0;
    color: ${DarkColors.Light_Icon}
`;