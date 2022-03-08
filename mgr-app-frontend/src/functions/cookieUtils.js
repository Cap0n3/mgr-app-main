/**
 * My cookies functions to set, get & delete cookies. 
 * I know I could have used react-cookies but it makes me so happy to do it myself !
 */

export const setCookie = (cookieName, cookieValue, expireDays) => {
    const date = new Date();
    date.setTime(date.getTime() + (expireDays*24*60*60*1000));
    let expires = "expires="+ date.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

export const deleteCookie = (cookieName) => {
    const date = new Date();
    // To delete cookie, simply set date to past
    date.setTime(date.getTime() + (-2*24*60*60*1000));
    let expires = "expires="+ date.toUTCString();
    document.cookie = cookieName + "=;" + expires + ";path=/";
}

export const getCookie = (cookieName) => {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    // If no cookie of that name exists, return null
    return null;
}

export const checkCookie = (cookieName) => {
    let cname = getCookie(cookieName);
    if (cname !== "") {
      return true;
    } else {
      return false; 
    }
  }