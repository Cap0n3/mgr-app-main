import styled from "styled-components";

export const Form = styled.form`
	max-width: 500px;
	padding: 10px 20px;
	background: #f4f7f8;
	margin: 10px auto;
	padding: 20px;
	background: #f4f7f8;
	border-radius: 8px;
	color: black;
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
		background: rgba(255,255,255,.1);
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
		background-color: #e8eeef;
		color:#8a97a0;
		-webkit-box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
		box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
		margin-bottom: 30px;
		color: black;
	}

	&:focus {
		background: #d2d9dd;
	}

	&[type="checkbox"] {
		margin-bottom: 30px;
	}

	&[type="submit"] {
		position: relative;
		display: block;
		padding: 19px 39px 18px 39px;
		color: #FFF;
		margin: 0 auto;
		background: #1abc9c;
		font-size: 18px;
		text-align: center;
		font-style: normal;
		width: 100%;
		border: 1px solid #16a085;
		border-width: 1px 1px 3px;
		margin-bottom: 10px;
	}

	&[type="submit"]:hover {
		background: #109177;
	}
`;

export const Select = styled.select`
	background: rgba(255,255,255,.1);
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
	background-color: #e8eeef;
	color:#8a97a0;
	-webkit-box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
	box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
	margin-bottom: 30px;
	color: black;
`;

export const Textarea = styled.textarea`
	background: rgba(255,255,255,.1);
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
	background-color: #e8eeef;
	color:#8a97a0;
	-webkit-box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
	box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
	margin-bottom: 30px;
	color: black;

	&:focus {
		background: #109177;
	}
`;
