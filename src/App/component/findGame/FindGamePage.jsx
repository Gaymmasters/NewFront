import React, { useEffect, useState } from "react";
import PostGame from "./postGame";
import { useNavigate } from "react-router-dom";
import classes from "./findGame.module.css";
import Loading from "./loading/loading";
import UserReg from "../../../API/RegUser";

const FindGamePage = () =>{
    useEffect(() => {
        getList()
    }, [])

    const [isPostsLoading,setIsPostsLoading] = useState(false)
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    async function getList(){
        setIsPostsLoading(true)
        const res = await UserReg.GamesFilterList()
        setPosts(res)
    }

    const [searchPost, setSearchPost] = useState("")

    const search = [...posts].filter(post => post.name.includes(searchPost))

    return(
        <div className={classes.fgpContainer}>
            <h1>Games</h1>
            <div className={classes.fgpPosts}>
                <form>
                    <input
                    type="text"
                    className={classes.fgpInp}
                    placeholder="Search game"
                    value={searchPost}
                    onChange={e => setSearchPost(e.target.value)}/>
                </form>
                {isPostsLoading
                    ?
                    <div>
                        {!searchPost.length || search.length
                        ?
                        <div className={classes.fgpMenu}>
                            {search.map(searchPost =>
                                <PostGame post={searchPost} key={searchPost.id}/>
                            )}
                        </div>
                        :
                        <h3>Not found</h3>
                        }
                    </div>
                    :
                    <div style={{display: "flex", justifyContent: 'center'}}>
                        <Loading/>
                    </div>
                }
            </div>
            <button className={classes.fgpBtn} onClick={()=>{navigate('/')}}>Back</button>
        </div>
    );
}

export default FindGamePage;