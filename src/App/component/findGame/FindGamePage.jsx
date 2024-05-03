import React, { useEffect, useMemo, useState } from "react";
import PostGame from "./postGame";
import { Link } from "react-router-dom";
import classes from "./findGame.module.css";
import Loading from "./loading/loading";

const FindGamePage = () =>{
    useEffect(() => {
        getList()
    }, [])

    const [isPostsLoading,setIsPostsLoading] = useState(false)

    const [posts, setPosts] = useState()
    async function getList(){
        setIsPostsLoading(true)
        const res = await UserReg.GamesList()
        if (!res.result){
            alert("Error: " + res.result);
        }
        else{
            setPosts(res)
            setIsPostsLoading(false)
        }
    }

    const [searchPost, setSearchPost] = useState("")

    const sortPosts = useMemo(() => {
        return [...posts].filter(post => (post.winflag == 0 && post.player2Id == 0))
    }, [posts])

    const search = useMemo(() =>{
        return [...sortPosts].filter(post => post.name.toLowerCase().includes(searchPost))
    }, [searchPost])

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
            <Link to="/">
                <button className={classes.fgpBtn}>Back</button>
            </Link>
        </div>
    );
}

export default FindGamePage;