import axios from "axios";

// Get Method
export async function GetApi(url, params = {}) {
    try {
        const response = await axios.get(url, {
            //withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${token}`,
            },
            params
        });
        console.log("GET Response:", response.data);
        return response.data;
    } catch (err) {
        console.error("GET Error:", err); 
        throw err.response?.data || err;
    }
}

// Post Method
export async function PostApi(url, data = {}) {
   
    try {
        const response = await axios.post(url, data, {
          //  withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${token}`,
            },
        });
        // console.log("POST Response:", response.data);
        return response.data;
    } catch (err) {
        console.error("POST Error:", err);
        throw err.response?.data || err;
    }
}