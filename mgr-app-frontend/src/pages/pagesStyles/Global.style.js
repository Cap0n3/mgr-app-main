import styled from "styled-components";

export const Button = styled.button`
	padding: 19px 39px 18px 39px;
	color: #FFF;
	margin: 0 auto;
	background-image: linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%);
	font-size: ${(props) => (props.fontSize ? props.fontSize : "18")}px;
	text-align: center;
	font-style: normal;
	width: ${(props) => props.bthWidth}%;
	border-radius: 8px;
	white-space: nowrap;
	border-style: none;
	outline: none;
	margin-bottom: 10px;
	cursor: pointer;

	&:hover {
		box-shadow: rgba(80, 63, 205, 0.5) 0 1px 30px;
  		transition-duration: .1s;
	}
`;