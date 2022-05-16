import styled from "styled-components";
import { DarkColors } from "../../Colors";

export const PageBody = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    width: 100%;
    height: 100vh;
    background-color: ${DarkColors.Dark_Background};
    overflow-y: scroll;
`;