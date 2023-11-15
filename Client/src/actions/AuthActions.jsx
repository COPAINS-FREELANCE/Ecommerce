
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

export const LoginUser = async (user) => {

    try {
        const res = await axios.post(`${apiDomain}/login`, user, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log(res)

        if (res.status !== 200) {
            throw new error("Network response was not ok")
        }
        return res.data

    } catch (err) {
        console.log(err)
    }
}