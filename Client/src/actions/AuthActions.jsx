
import axios from 'axios';
import { apiDomain } from '../utils/apiDomain';


export const SendToSignup = async (data) => {

    try {
        const { first_name, last_name, email, password } = data;


        const response = await axios.post(`${apiDomain}/signup`, { first_name, last_name, email, password }, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        console.log(response)

        if (response.status !== 200) {
            throw new error("Network response was not ok")
        }

        return response.data

    } catch (error) {
        console.log(error)

    }

}