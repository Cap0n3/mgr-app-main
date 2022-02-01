/**
 * CRUD API custom calls functions.
 */

// ==================== //
// ====== CREATE ====== //
// ==================== //
export const createClient = async (authTokens, user, inputs) => {
    let response = await fetch(`http://127.0.0.1:8000/client/create/`, {
        method: "POST",
        headers: {
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
        },
        body: JSON.stringify({
            first_name: inputs.first_name,
            last_name: inputs.last_name,
            invoice_fname: inputs.invoice_fname,
            invoice_lname: inputs.invoice_lname,
            student_birth: inputs.student_birth,
            lesson_day: inputs.lesson_day,
            lesson_hour: inputs.lesson_hour,
            lesson_duration: inputs.lesson_duration,
            lesson_frequency: inputs.lesson_frequency,
            instrument: inputs.instrument,
            student_level: inputs.student_level,
            student_email: inputs.student_email,
            student_phone: inputs.student_phone,
            billing_rate: inputs.billing_rate,
            billing_currency: inputs.billing_currency,
            invoice_numbering: inputs.invoice_numbering,
            invoice_email: inputs.invoice_email,
            invoice_phone: inputs.invoice_phone,
            invoice_address: inputs.invoice_address,
            invoice_postal: inputs.invoice_postal,
            invoice_city: inputs.invoice_city,
            invoice_country: inputs.invoice_country,
            payment_option: inputs.payment_option,
            notes: inputs.notes,
        }),
    })

    return checkErrors(response, user, "CREATE")
}

// ================== //
// ====== READ ====== //
// ================== //
export const getClients = async (authTokens, user) => {
    let response = await fetch('http://127.0.0.1:8000/clients/', {
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
    let response = await fetch(`http://127.0.0.1:8000/client/${clientID}`, {
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
    let response = await fetch(`http://127.0.0.1:8000/client/update/${clientID}`, {
        method: "PUT",
        headers: {
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
        },
            body: JSON.stringify({
                first_name: inputs.first_name,
                last_name: inputs.last_name,
                invoice_fname: inputs.invoice_fname,
                invoice_lname: inputs.invoice_lname,
                student_birth: inputs.student_birth,
                lesson_day: inputs.lesson_day,
                lesson_hour: inputs.lesson_hour,
                lesson_duration: inputs.lesson_duration,
                lesson_frequency: inputs.lesson_frequency,
                instrument: inputs.instrument,
                student_level: inputs.student_level,
                student_email: inputs.student_email,
                student_phone: inputs.student_phone,
                billing_rate: inputs.billing_rate,
                billing_currency: inputs.billing_currency,
                invoice_numbering: inputs.invoice_numbering,
                invoice_email: inputs.invoice_email,
                invoice_phone: inputs.invoice_phone,
                invoice_address: inputs.invoice_address,
                invoice_postal: inputs.invoice_postal,
                invoice_city: inputs.invoice_city,
                invoice_country: inputs.invoice_country,
                payment_option: inputs.payment_option,
                notes: inputs.notes,
            }),
    })

    return checkErrors(response, user, "UPDATE")
}

// ==================== //
// ====== DELETE ====== //
// ==================== //
export const deleteClient = async (authTokens, user, clientID) => {
    // clientID = 67
    let response = await fetch(`http://127.0.0.1:8000/client/delete/${clientID}`, {
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
        `${operation} operation was a success !\n` +
        `HTTP REQUEST : ${httpResponse.status} ${httpResponse.statusText}`, "color: green; font-style: bold;")
        return true
    }
    else if (httpResponse.status === 204)
    {
        console.info(`%c[User : ${user.username} (${user.user_id})]\n` +
        `${operation} operation was a success ! Client successfully deleted !\n` +
        `HTTP REQUEST : ${httpResponse.status} ${httpResponse.statusText}`, "color: green; font-style: bold;")
        return true
    }
    else if (httpResponse.statusText === 'Unauthorized') 
    {
        throw new Error(`[User : ${user.username} (${user.user_id})] ${operation} operation has failed => Code 401 (Unauthorized)`);
    }
    else
    {
        throw new Error(`[User : ${user.username} (${user.user_id})] ${operation} operation has failed : ${httpResponse.status} ${httpResponse.statusText}`);
    }
}