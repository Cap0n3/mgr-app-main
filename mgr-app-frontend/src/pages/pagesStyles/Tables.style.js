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
    padding: 8px;
    color: white;
    background-color: #202750ff;

    &:first-child {
        border-top-left-radius: 10px;
    }

    &:last-child {
        border-top-right-radius: 10px;
    }
`;

export const Cell = styled.td`
    background-color: #191f3f;
    text-align: left;
    padding: 8px;
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

export const TableControls = styled.div`
    display: flex;
    justify-content: center;
    width: 30px;
    padding: 8px 0px 8px 0px;
    text-decoration: none;
    border: 1px solid yellow;
`;