import axios  from "axios";

export async function getAll(){
    try {
        const res = await axios.get("https://jsonplaceholder.typicode.com/posts")
        return res.data
    } catch (error) {
        console.log(error)
    }
}