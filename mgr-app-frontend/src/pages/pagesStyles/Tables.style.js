import styled from "styled-components";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";

export const EyeIcon = styled(FaEye)`
    cursor: pointer;
`;

export const EditIcon = styled(FaEdit)`
    cursor: pointer;
`;

export const TrashIcon = styled(FaTrashAlt)`
    cursor: pointer;
`;

export const ClientTable = styled.table`
    border-collapse: collapse;
    width: 100%;
    margin: 20px 0px 20px 0px;
`;

export const HeaderCell = styled.th`
    text-align: left;
    height: 50px;
    padding: 8px 8px 8px 20px;
    background-color: #202750ff;
    
    &:first-child {
        border-top-left-radius: 10px;
    }

    &:last-child {
        border-top-right-radius: 10px;
    }

    @media screen and (max-width: 1120px) {
        display: ${(props) => (props.hide === "1120" ? "none" : "table-cell")};
    }

    @media screen and (max-width: 880px) {
        display: ${(props) => 
            (props.hide === "880" && "none") ||
            (props.hide === "1120" && "none") || 
            "table-cell"
        };
    }

    @media screen and (max-width: 780px) {
        display: ${(props) => 
            (props.hide === "780" && "none") ||
            (props.hide === "880" && "none") ||
            (props.hide === "1120" && "none") || 
            "table-cell"
        };
    }

    @media screen and (max-width: 720px) {
        display: ${(props) => 
            (props.hide === "720" && "none") ||
            (props.hide === "780" && "none") ||
            (props.hide === "880" && "none") || 
            (props.hide === "1120" && "none") ||
            "table-cell"
        };
        height: 30px;
    }
`;

export const Cell = styled.td`
    text-align: left;
    padding: 8px 8px 8px 20px;
    background-color: #191f3f;

    @media screen and (max-width: 1120px) {
        display: ${(props) => (props.hide === "1120" ? "none" : "table-cell")};
    }

    @media screen and (max-width: 880px) {
        display: ${(props) => 
            (props.hide === "880" && "none") ||
            (props.hide === "1120" && "none") || 
            "table-cell"
        };
    }

    @media screen and (max-width: 780px) {
        display: ${(props) => 
            (props.hide === "780" && "none") ||
            (props.hide === "880" && "none") ||
            (props.hide === "1120" && "none") || 
            "table-cell"
        };
    }

    @media screen and (max-width: 720px) {
        display: ${(props) => 
            (props.hide === "720" && "none") ||
            (props.hide === "780" && "none") ||
            (props.hide === "880" && "none") || 
            (props.hide === "1120" && "none") ||
            "table-cell"
        };
    }
`;

export const ProfilePic = styled.img`
    overflow: hidden;
    vertical-align: middle;
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

export const FooterCell = styled.td`
    height: 10px;
    padding: 8px;
    background-color: #202750ff;

    &:first-child {
        border-bottom-left-radius: 10px;
    }

    &:last-child {
        border-bottom-right-radius: 10px;
    }

    @media screen and (max-width: 1120px) {
        display: ${(props) => (props.hide === "1120" ? "none" : "table-cell")};
    }

    @media screen and (max-width: 880px) {
        display: ${(props) => 
            (props.hide === "880" && "none") ||
            (props.hide === "1120" && "none") || 
            "table-cell"
        };
    }

    @media screen and (max-width: 780px) {
        display: ${(props) => 
            (props.hide === "780" && "none") ||
            (props.hide === "880" && "none") ||
            (props.hide === "1120" && "none") || 
            "table-cell"
        };
    }

    @media screen and (max-width: 720px) {
        display: ${(props) => 
            (props.hide === "720" && "none") ||
            (props.hide === "780" && "none") ||
            (props.hide === "880" && "none") || 
            (props.hide === "1120" && "none") ||
            "table-cell"
        };
    }
`;

export const Line = styled.tr`
    border-bottom: 1px solid #262f59ff;
    
    &:last-child {
        border-bottom: none;
    }

    // &:nth-child(even) {
    //     background-color: #202750ff;
    // }
`;
