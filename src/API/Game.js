import axios from "axios"

const url = "http://95.131.149.248:7789/"
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
}