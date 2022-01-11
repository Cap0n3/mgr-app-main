export const isMenuClicked = (event, classToCheck) => {
    /*
		Function : Checks if header menu icons has been clicked.
        It allows to not change state value to false to avoid true/false 
        contradiction between onClick() and handleClickOutside().
        (Otherwise menus close and open again when menu icon is clicked ...)

        Params:
            Take mousedown event and class name string of element to monitor.
        Returns:
            A string that represent what have been clicked.
	*/
    let elementClassName = ""
    event.stopPropagation()

    if(event.target.tagName === "path"){
        /*
            Handle case where target returns tag <path> instead of <svg> (<path> has no className) 
            Can occur if <svg> icon is clicked by user exactly on the path line 
            Note that <path> is inside of <svg> :
            <svg>
                <path></path>
            </svg>
        */
        elementClassName = event.target.ownerSVGElement.className["baseVal"]
    }
    else if(event.target.tagName === "svg") {
        elementClassName = event.target.className["baseVal"]
    }

    return (elementClassName === classToCheck) ? "iconClick" : "outsideClick";
}