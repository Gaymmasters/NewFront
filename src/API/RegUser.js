import axios from "axios"

const url = "http://95.131.149.248:7789/"
export default class UserReg{
    static async Reg(data) {
        try{
            const res = await axios.post(url+"api/registration",{...data})
            return res.data
        }catch(error){ console.log(error) }
        
    }
    static async LogIn(data) {
        try{
            const res = await axios.post(url+"api/login",{...data})
            return res.data
        }catch(error){ console.log(error) }
        
    }
    static async LogOut(data) {
        try{
            const res = await axios.post(url+"api/logout",{...data})
            return res.data
        }catch(error){ console.log(error) }
        
    }
    static async ChangeLogin(data) {
        try{
            const res = await axios.put(url+"api/user/login/" + localStorage.getItem("id"),{...data})
            return res.data
        }catch(error){ console.log(error) }
        
    }
    static async ChangeSkin(data) {
        try{
            const res = await axios.put(url+"api/user/skin/" + localStorage.getItem("id"),{...data})
            return res.data
        }catch(error){ console.log(error) }
        
    }
    static async CreateGame(data) {
        try{
            const res = await axios.post(url+"api/create",{...data})
            return res.data
        }catch(error){ console.log(error) }
        
    }
    static async GamesList() {
        try{
            const res = await axios.get(url+"api/game")
            return res.data
        }catch(error){ console.log(error) }
        
    }
    static async JoinToGame(data) {
        try{
            const res = await axios.put(url+"api/join",{...data})
            return res.data
        }catch(error){ console.log(error) }
        
    }
    static async GetInfAboutGame(id) {
        try{
            const res = await axios.get(url+"api/game/"+id)
            return res.data
        }catch(error){ console.log(error) }
        
    }
    static async GetInfAboutUser(id) {
        try{
            const res = await axios.get(url+"api/user/"+id)
            return res.data
        }catch(error){ console.log(error) }
        
    }
}
