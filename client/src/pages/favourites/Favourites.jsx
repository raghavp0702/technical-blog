import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import { Context } from '../../context/Context';


function Favourites() {
    const {user} = useContext(Context);

  const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get(`/${user._id}/favourites`);
            setPosts(res.data);
        };

        fetchPosts();
    }, []);

  return (
    <div>
      <Header />
      <div className="home">
        <Sidebar />
        <Posts posts={posts} />
      </div>
    </div>
  )
}

export default Favourites