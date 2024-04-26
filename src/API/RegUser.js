import axios from "axios"

export default class UserReg{
    static async Reg(data) {
        try{
            const res = await axios.post("http://localhost:5000/api/registration",{...data})
            return res.data
        }catch(error){ console.log(error) }
        
    }
    static async LogIn(data) {
        try{
            const res = await axios.post("http://localhost:5000/api/login",{...data})
            return res.data
        }catch(error){ console.log(error) }
        
    }
    static async LogOut(data) {
        try{
            const res = await axios.post("http://localhost:5000/api/logout",{...data})
            return res.data
        }catch(error){ console.log(error) }
        
    }
    static async ChangeInf(data) {
        try{
            const res = await axios.put("http://localhost:5000/api/user/" + localStorage.getItem("id"),{...data})
            return res.data
        }catch(error){ console.log(error) }
        
    }
}
