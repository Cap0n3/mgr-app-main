import React from "react";
import Header from "./Header/Header";
import Content from "./Content";
import "../layout.css";

const Container = () => {
	return (
		<>
			<div className="main-container">
				<Header />
				<Content />
			</div>
		</>
	);
};

export default Container;
