import axios from "axios"
import {url} from "./const.js"

export default class Game{
    static async getGameMoves(id) {
        try{
            const res = await axios.get(url+"api/moves/"+id)
            return res.data
        }catch(error){ console.log(error) }
        
    }
    static async makeMove(data) {
        try{
            const res = await axios.post(url+"api/makemove",{...data})
            return res.data
        }catch(error){ console.log(error) }
        
    }
    static async moveBot(data) {
        try{
            const res = await axios.post(url+"api/botmove",{...data})
            return res.data
        }catch(error){ console.log(error) }
        
    }
    static async ChangeWinFlag(data) {
        try{
            const res = await axios.put(url+"api/flagwinner",{...data})
            return res.data
        }catch(error){ console.log(error) }
        
    }
    static async DeleteGame(id) {
        try{
            const res = await axios.delete(url+"api/game/"+id)
            return res.data
        }catch(error){ console.log(error) }
        
    }
}