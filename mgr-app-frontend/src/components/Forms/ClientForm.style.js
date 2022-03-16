import styled from "styled-components";
import { RiErrorWarningLine } from "react-icons/ri";

// FORM COLOR PALETTE
const FORM_BCKG_COLOR = "#202750ff";
const INPUTS_BCKG_COLOR = "#313D73"
const INPUTS_FOCUS_COLOR = "#3B4989"
const INPUTS_TEXT_COLOR = "#94A0D6"


export const Form = styled.form`
	max-width: 500px;
	padding: 10px 20px;
	margin: 10px auto;
	padding: 20px;
	background-color: ${FORM_BCKG_COLOR};
	border-radius: 8px;
`;

export const Label = styled.label`
	display: block;
	margin-bottom: 8px;
`;

export const RadioLabel = styled.label`
	margin-right: 5px;
	padding-bottom: 30px;
`;

export const Legend = styled.legend`
	font-size: 1.4em;
	margin-bottom: 25px
`;

export const Input = styled.input`
	&[type="file"], 
	&[type="text"], 
	&[type="email"],
	&[type="number"],
	&[type="tel"],
	&[type="date"],
	&[type="time"] {
		border: none;
		border-radius: 4px;
		font-size: 15px;
		margin: 0px 0px 30px 0px;
		outline: 0;
		padding: 10px;
		width: 100%;
		box-sizing: border-box; 
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		background-color: ${({isValid}) => 
			(isValid === "true" && `${INPUTS_BCKG_COLOR}`) || 
			(isValid === "false" &&  "red") ||
			`${INPUTS_BCKG_COLOR}` /* If isValid prop is not setup */
		};
		-webkit-box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
		box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
		color: ${INPUTS_TEXT_COLOR};
	}
	
	&:focus {
		background: ${INPUTS_FOCUS_COLOR};
		border: ${({isValid}) => 
			(isValid === "true" && "1px solid green") || 
			(isValid === "false" &&  "1px solid red") ||
			"none"
		};
		color: ${({isValid}) => 
			(isValid === "true" && `${INPUTS_TEXT_COLOR}`) || 
			(isValid === "false" &&  "red") ||
			`${INPUTS_TEXT_COLOR}`
		};

	}

	&[type="checkbox"] {
		margin-bottom: 30px;
	}

	&[type="file"] {
		display: none;
	}

	&[type="submit"] {
		position: relative;
		display: block;
		padding: 19px 39px 18px 39px;
		color: #FFF;
		margin: 0 auto;
		background-image: linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%);
		font-size: 18px;
		text-align: center;
		font-style: normal;
		width: 100%;
		border-radius: 8px;
		border-style: none;
		outline: none;
		white-space: nowrap;
		margin-bottom: 10px;
		cursor: pointer;
	}

	&[type="submit"]:hover {
		box-shadow: rgba(80, 63, 205, 0.5) 0 1px 30px;
  		transition-duration: .1s;
	}
`;

export const LabelPic = styled.label`
	display: inline-block;
	box-sizing: border-box;
	margin: 0 auto;
	margin-bottom: 30px;
	background-image: linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%);
	padding: 12px 0px 12px 0px;
	text-align: center;
	width: 100%;
	border-radius: 8px;
	border-style: none;
	outline: none;
	white-space: nowrap;
	cursor: pointer;

	&:hover {
		box-shadow: rgba(80, 63, 205, 0.5) 0 1px 30px;
  		transition-duration: .1s;
	}
`;

export const Select = styled.select`
	border: none;
	border-radius: 4px;
	font-size: 15px;
	margin: 0;
	outline: 0;
	padding: 10px;
	width: 100%;
	box-sizing: border-box; 
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box; 
	background-color: ${INPUTS_BCKG_COLOR};
	color:#8a97a0;
	-webkit-box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
	box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
	margin-bottom: 30px;
	color: ${INPUTS_TEXT_COLOR};
`;

export const Textarea = styled.textarea`
	border: none;
	border-radius: 4px;
	font-size: 15px;
	margin: 0;
	outline: 0;
	padding: 10px;
	width: 100%;
  	height: 150px;
	box-sizing: border-box; 
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box; 
	background-color: ${({isValid}) => 
		(isValid === "true" && `${INPUTS_BCKG_COLOR}`) || 
		(isValid === "false" &&  "red") ||
		`${INPUTS_BCKG_COLOR}` /* If isValid prop is not setup */
	};
	color: #8a97a0;
	-webkit-box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
	box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
	margin-bottom: 30px;
	color: ${INPUTS_TEXT_COLOR};

	&:focus {
		background: ${INPUTS_FOCUS_COLOR};
		border: ${({isValid}) => 
			(isValid === "true" && "1px solid green") || 
			(isValid === "false" &&  "1px solid red") ||
			"none"
		};
	}
`;

export const Avatar = styled.img`
	width: 200px;
	height: 200px;
	border-radius: 50%;
`;

export const AvatarWrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	margin-bottom: 30px;
`;

export const WarningBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px 0px 10px 0px;
	margin-bottom: 30px;
	border: 1px dotted red;
	border-radius: 4px;

	& > p {
		color: red;
		font-size: 0.9em;
		margin: 0px;
	}

	@media screen and (max-width: 960px) {
		& > p {
			font-size: 0.8em;
		}
	}
`;

export const WarnIcon = styled(RiErrorWarningLine)`
	font-size: 1.2em;
	color: red;
	margin: 0px 5px 0px 0px;

	@media screen and (max-width: 960px) {
		font-size: 1.0em;
	}
`;