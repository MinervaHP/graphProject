import axios from "./Axios"

export default class UserService {
    static async Login(userName, password) {
        const response = await axios.post(
            '/User/Login',
            { UserName: userName, Password: password },
            { headers: { 'Content-Type': 'application/json' } }
        )
        return response;
    }
    static async Register(firstName,lastName,userName,email, password) {
        const response = await axios.post(
            '/User/Register',
            {FirstName:firstName,LastName:lastName, UserName: userName,Gmail:email, Password: password },
            { headers: { 'Content-Type': 'application/json' } }
        )
        return response;
    }
}