/*
 My cookies functions to set, get & delete cookies. 
 I know I could have used react-cookies but it makes me so happy to do it myself !
*/

/**
 * This custom function sets a cookie (I didn't use react-cookie library).
 * @param {str} cookieName Name of cookie. 
 * @param {*} cookieValue Any value.
 * @param {int} expireDays Days before expiration
 */
export const setCookie = (cookieName, cookieValue, expireDays) => {
    const date = new Date();
    date.setTime(date.getTime() + (expireDays*24*60*60*1000));
    let expires = "expires="+ date.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

/**
 * This function deletes a cookie.
 * @param {str} cookieName Cookie name to delete.
 */
export const deleteCookie = (cookieName) => {
    const date = new Date();
    // To delete cookie, simply set date to past
    date.setTime(date.getTime() + (-2*24*60*60*1000));
    let expires = "expires="+ date.toUTCString();
    document.cookie = cookieName + "=;" + expires + ";path=/";
}

/**
 * This function get a cookie if it exists.
 * @param {str} cookieName Name of cookie to retrieve. 
 * @returns {str, null} The cookie or null.
 */
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

/**
 * This function checks if a cookie is set.
 * @param   {str}   cookieName  Name of cookie to check. 
 * @returns {bool}              True if it is set.
 */
export const checkCookie = (cookieName) => {
    let cname = getCookie(cookieName);
    if (cname !== null) {
      return true;
    } else {
      return false; 
    }
  }