import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

export const getAccessToken = async ()=>{
    const {CONSUMER_KEY, CONSUMER_SECRET} = process.env
    const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64")
    try {
        const response = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
            {headers:{Authorization:`Basic ${auth}`}}
        )
        return response.data.access_token

    } catch (error) {
        console.log(error);  
    }
}

