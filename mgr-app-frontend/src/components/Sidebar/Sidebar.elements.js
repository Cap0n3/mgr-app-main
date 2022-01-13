import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const StyledLink = styled(NavLink) `
	display: flex;
	align-items: center;
	text-decoration: none;
	color: #44578eff;

	&.${props => props.activeclassname} {
		color: #8796c5;
	 }
`;