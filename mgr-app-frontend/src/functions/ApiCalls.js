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
    
    let data = await response.json()
    
    if (response.status === 200) {
        // For DEBUG
        console.log("getClient() says : " + user.fname + " " + user.lname + " successfully identified !")
        return data
        
    } else if (response.statusText === 'Unauthorized') 
    {
        throw new Error('Status Code 401 Unauthorized');
    }	
}

// ==================== //
// ====== DELETE ====== //
// ==================== //
export const deleteClient = async (authTokens, clientID) => {
    await fetch(`http://127.0.0.1:8000/client/delete/${clientID}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
        },
    })
}

