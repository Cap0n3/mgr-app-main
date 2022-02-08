/**
 * CRUD API custom calls functions.
 */

const SERVER = "http://127.0.0.1:8000"

// ==================== //
// ====== CREATE ====== //
// ==================== //
export const createClient = async (authTokens, user, inputs) => {
        /*
            For image uploading, I choosed multipart/form-data instead of base64 encoding.
            Multipart/form-data is standard, faster and consumes less bandwidth.
        */
        let profilePic = inputs.student_pic;
        let formData = new FormData();

        // Append data to object
        if(profilePic != undefined){
            formData.append("student_pic", profilePic);
        }
        formData.append("first_name", inputs.first_name);
        formData.append("last_name", inputs.last_name);
        formData.append("lesson_day", inputs.lesson_day);
        formData.append("lesson_hour", inputs.lesson_hour);
        formData.append("lesson_duration", inputs.lesson_duration);
        formData.append("lesson_frequency", inputs.lesson_frequency);
        formData.append("instrument", inputs.instrument);
        formData.append("student_email", inputs.student_email);
        formData.append("student_phone", inputs.student_phone);
        formData.append("student_level", inputs.student_level);
        formData.append("student_birth", inputs.student_birth);
        formData.append("invoice_fname", inputs.invoice_fname);
        formData.append("invoice_lname", inputs.invoice_lname);
        formData.append("invoice_email", inputs.invoice_email);
        formData.append("invoice_phone", inputs.invoice_phone);
        formData.append("invoice_address", inputs.invoice_address);
        formData.append("invoice_postal", inputs.invoice_postal);
        formData.append("invoice_city", inputs.invoice_city);
        formData.append("invoice_country", inputs.invoice_country);
        formData.append("invoice_numbering", inputs.invoice_numbering);
        formData.append("billing_rate", inputs.billing_rate);
        formData.append("billing_currency", inputs.billing_currency);
        formData.append("payment_option", inputs.payment_option);
        formData.append("notes", inputs.notes);

        let response = await fetch(`${SERVER}/client/create/`, {
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

// ================== //
// ====== READ ====== //
// ================== //
export const getClients = async (authTokens, user) => {
    let response = await fetch(`${SERVER}/clients/`, {
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

// Get a single client
export const getClient = async (authTokens, user, clientID) => {
    let response = await fetch(`${SERVER}/client/${clientID}`, {
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

export const updateClient =  async (authTokens, user, clientID, inputs) => {
    
    let profilePic = inputs.student_pic;
    let formData = new FormData();
    
    /* 
        If type of profilePic is equal to a string then it's a link to a an img stored by server. 
        Basically, it means that user have not updated his/her profile pic so don't update value of 
        this var with a string because a file object is expected by the server.
    */ 
    if(profilePic != undefined && typeof(profilePic) != "string"){
        formData.append("student_pic", profilePic);
    }
    formData.append("first_name", inputs.first_name);
    formData.append("last_name", inputs.last_name);
    formData.append("lesson_day", inputs.lesson_day);
    formData.append("lesson_hour", inputs.lesson_hour);
    formData.append("lesson_duration", inputs.lesson_duration);
    formData.append("lesson_frequency", inputs.lesson_frequency);
    formData.append("instrument", inputs.instrument);
    formData.append("student_email", inputs.student_email);
    formData.append("student_phone", inputs.student_phone);
    formData.append("student_level", inputs.student_level);
    formData.append("student_birth", inputs.student_birth);
    formData.append("invoice_fname", inputs.invoice_fname);
    formData.append("invoice_lname", inputs.invoice_lname);
    formData.append("invoice_email", inputs.invoice_email);
    formData.append("invoice_phone", inputs.invoice_phone);
    formData.append("invoice_address", inputs.invoice_address);
    formData.append("invoice_postal", inputs.invoice_postal);
    formData.append("invoice_city", inputs.invoice_city);
    formData.append("invoice_country", inputs.invoice_country);
    formData.append("invoice_numbering", inputs.invoice_numbering);
    formData.append("billing_rate", inputs.billing_rate);
    formData.append("billing_currency", inputs.billing_currency);
    formData.append("payment_option", inputs.payment_option);
    formData.append("notes", inputs.notes);

    let response = await fetch(`${SERVER}/client/update/${clientID}`, {
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
export const deleteClient = async (authTokens, user, clientID) => {
    // clientID = 67
    let response = await fetch(`${SERVER}/client/delete/${clientID}`, {
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