/*
    CRUD API custom calls functions.
*/

// ==================== //
// ====== CREATE ====== //
// ==================== //

/**
 * This function creates an API request to create a new entry in a database on a remote server and handle errors. 
 * > **Note :** The body of the request uses a `Multipart/form-data` format.
 * @param   {string}    endpoint    String representing server endpoint URL.   
 * @param   {Object}    authTokens  Authentification token to connect to server.
 * @param   {Object}    user        User infos for identification.
 * @param   {Object}    inputs      Object reprenting form inputs key/value pair (must be identical to database model).
 * @returns                         True or throw Error (if any).
 */
export const createEntry = async (endpoint, authTokens, user, inputs) => {
    /*
        The FormData interface provides a way to easily construct a set of key/value pairs representing form fields and their values.
        It uses the same format a form would use if the encoding type were set to "multipart/form-data".

        Note: For image uploading, I choosed multipart/form-data instead of base64 encoding.
        Multipart/form-data is standard, faster and consumes less bandwidth.

    */
    let formData = new FormData();
    
    // Get entries in an array
    const inputEntries = Object.entries(inputs)

    // Append input data to FormData object
    inputEntries.map((item) => (
        formData.append(item[0], item[1])
    ));
    
    let response = await fetch(endpoint, {
        method: "POST",
        headers: {
            // Do not put Content-Type: multipart/form-data ! FormData() doesn't handle "boundary" ...
            // The trick here is to let server find right according to body content type.
            'Authorization':'Bearer ' + String(authTokens.access)
        },
        body: formData
    })

    return checkErrors(response, user, "CREATE")
}

export const signUpCall = async (endpoint, inputs) => {
    let formData = new FormData();
    
    // Get entries in an array
    const inputEntries = Object.entries(inputs)

    // Append input data to FormData object
    inputEntries.map((item) => (
        formData.append(item[0], item[1])
    ));

    // for (let el of formData) {
    //     console.log(el)
    // }

    // Get user name from input data
    let user = formData.get("username");
    
    let response = await fetch(endpoint, {
        method: "POST",
        headers: {
            // Do not put Content-Type: multipart/form-data ! FormData() doesn't handle "boundary" ...
            // The trick here is to let server find right according to body content type.
            
        },
        body: formData
    })

    return checkErrors(response, user, "SIGNUP")
}

// ================== //
// ====== READ ====== //
// ================== //

/**
 * This function retrives all database column entries belonging to a specific authenticated user and check for errors.
 * @param      {string}     endpoint       Endpoint of request.
 * @param      {Object}     authTokens     Authentication tokens.
 * @param      {Object}     user           User informations.
 * @returns                                Column entries data in an json object.                        
 */
export const getEntries = async (endpoint, authTokens, user) => {
    let response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
        }
    })

    if (checkErrors(response, user, "READ")) {
        let data = await response.json()
        return data;
    } 
}

/**
 * This function retrieves a single entry belonging to a specific authenticated user and check for errors
 * @param   {string}    endpoint    Endpoint of request. 
 * @param   {Object}    authTokens  Authentication tokens.
 * @param   {Object}    user        User informations.
 * @param   {string}    entryID     Primary key (ID) of database entry.
 * @returns                         Entry data in an json object.
 */
export const getEntry = async (endpoint, authTokens, user, entryID) => {
    let entryEndoint = endpoint + entryID
    let response = await fetch(entryEndoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
        }
    })

    if (checkErrors(response, user, "READ")) {
        let data = await response.json()
        return data;
    } 
}

// ==================== //
// ====== UPDATE ====== //
// ==================== //

/**
 * This function creates an API request to update an entry in a database on a remote server and handle errors.
 * > **Note :** The body of the request uses a `Multipart/form-data` format.
 * @param   {string}    endpoint    String representing server endpoint URL.
 * @param   {Object}    authTokens  Authentification token to connect to server.
 * @param   {Object}    user        User infos for identification.
 * @param   {string}    entryID     ID (primary key) of entry to update.
 * @param   {Object}    inputs      Object reprenting form inputs key/value pair (must be identical to database model).   
 * @returns                         True or throw Error (if any).
 */
export const updateEntry =  async (endpoint, authTokens, user, entryID, inputs) => {
    // Create FormData object
    let formData = new FormData();
    
    // Get entries in an array
    const inputEntries = Object.entries(inputs)

    // Append input data to FormData object & test if image is not a link to server stored image.
    inputEntries.map((item) => {
        // Only entries with these terms will be evaluated
        const isImage = /(pic|picture|image|img|logo)/i;
        /* 
            If value of image input is equal to a string then it's a link to a an image stored by the server. 
            Basically, this means that user have not updated image so don't update value of 
            this var with a string because ONLY a file object is expected by the server.
        */ 
        if(isImage.test(item[0]) && typeof(item[1]) !== "string"){
            formData.append(item[0], item[1])
        }
        else if(!isImage.test(item[0])) {
            // It's not an image input
            formData.append(item[0], item[1])
        }
        
    })
    
    // Create final URL with entry ID
    const updateEndpoint = endpoint + entryID;

    let response = await fetch(updateEndpoint, {
        method: "PUT",
        headers: {
            // 'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
        },
            body: formData
    })

    return checkErrors(response, user, "UPDATE")
}

// ==================== //
// ====== DELETE ====== //
// ==================== //

/**
 * This function creates an API request to delete an entry belonging to a specific authenticated user on a remote server and handle errors.
 * @param   {string}    endpoint        String representing server endpoint URL.
 * @param   {Object}    authTokens      Authentification token to connect to server.
 * @param   {Object}    user            User infos for identification.
 * @param   {string}    entryID         ID (primary key) of entry to delete.         
 * @returns                             True or throw Error (if any).
 */
export const deleteEntry = async (endpoint, authTokens, user, entryID) => {
    // Create final URL with entry ID
    let deleteEndpoint = endpoint + entryID;
    let response = await fetch(deleteEndpoint, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
        },
    })

    return checkErrors(response, user, "DELETE")
}

// ============================ //
// ====== ERROR HANDLING ====== //
// ============================ //

const checkErrors = (httpResponse, user, operation) => {
    if (httpResponse.status === 200 || httpResponse.status === 201) 
    {
        console.info(`%c[User : ${user.username} (${user.user_id})]\n` +
        `[Teacher : ${user.fname} ${user.lname}]\n` +
        `${operation} operation was a success !\n` +
        `HTTP REQUEST : ${httpResponse.status} ${httpResponse.statusText}`, "color: green; font-style: bold;")
        return true
    }
    else if (httpResponse.status === 204)
    {
        console.info(`%c[User : ${user.username} (${user.user_id})]\n` +
        `[Teacher : ${user.fname} ${user.lname}]\n` +
        `${operation} operation was a success ! Client successfully deleted !\n` +
        `HTTP REQUEST : ${httpResponse.status} ${httpResponse.statusText}`, "color: green; font-style: bold;")
        return true
    }
    else if (httpResponse.statusText === 'Unauthorized') 
    {
        throw new Error(`[User : ${user.username} (${user.user_id})] [Teacher : ${user.fname} ${user.lname}]\n` +
            `${operation} operation has failed => Code 401 (Unauthorized)`
        );
    }
    else
    {
        throw new Error(`[User : ${user.username} (${user.user_id})] [Teacher : ${user.fname} ${user.lname}]\n`+ 
            `${operation} operation has failed : ${httpResponse.status} ${httpResponse.statusText}`);
    }
}