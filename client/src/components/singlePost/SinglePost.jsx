import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  // console.log(path);
  const { user } = useContext(Context);

  const PF = "http://localhost:5000/images/";
  const [post, setPost] = useState({});

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const [likeMode, setLikeMode] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [favourites, setFavourites] = useState([]);

  const [likes, setLikes] = useState(0);

  const addComment = async (e) => {
    e.preventDefault();
    const res = await axios.put(`/posts/${post._id}/comments`, {
      text: commentText,
      user: user._id,
      name: user.username
      
    });
    // .then(data => console.log(data));
    // .then((myres)=> myres.data)

    // if(result.data.comments)

    console.log(res);

    const newData = comments.map(item=>{
      if(item.id === res.data._id)
      {
        return res;
      }
      else return item;

    })
    // setComments(newData);
    console.log(newData);
  };

  const likeHandler = async (e) => {
    e.preventDefault();
    setLikeMode(false);
    const postId = post._id;
    console.log(postId);
    await axios
      .put(`/posts/${post._id}/like`, {
        id: postId,
      })
      .then((res) => {
        console.log(res);
        setLikes(res.data.likes);
      });
  };
  const unlikeHandler = async (e) => {
    e.preventDefault();
    setLikeMode(true);
    const postId = post._id;
    console.log(postId);
    await axios
      .put(`/posts/${post._id}/unlike`, {
        id: postId,
      })
      .then((res) => {
        console.log(res);
        setLikes(res.data.likes);
      });
  };

  const updateHandler = async (e) => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
      // e.target.disabled();
    } catch (error) {}
  };

  const favouriteHandler = async (e)=>{
    e.preventDefault();
    const postId = post._id;
    // console.log(user._id);

    await axios
      .post(`/posts/${postId}/favourites`, {
        id: user._id
      })
      .then((res) => {
        console.log(res);
      });
  }

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      console.log(res);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setLikes(res.data.likes);
      setComments(res.data.comments);
      // console.log(comments);
    };

    getPost();
  }, [path]);

  const deleteHandler = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: {
          username: user.username,
        },
      });

      window.location.replace("/");
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img className="singlePostImg" src={PF + post.photo} alt="" />
        )}
        {/* when updating post */}
        {updateMode ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="singlePostTitleInput"
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}

            {likeMode ? (
              
              <i className="fa-solid fa-heart singlePostIcon" style={{color:'red'}} onClick={likeHandler}></i>
              ) : (
                <i className="fa-solid fa-heart singlePostIcon" style={{color:'red'}} disabled onClick={unlikeHandler}></i> 
            )}
            <p>{likes}</p>

            {/* <button className="singlePostIcon">Favourite</button> */}
            <i className="fa-solid fa-star singlePostIcon" style={{color:'yellow'}} onClick={favouriteHandler} ></i>
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={deleteHandler}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo ">
          <span>
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b className="singlePostAuthor">{post.username}</b>
            </Link>
          </span>
          <span>Created At: {new Date(post.createdAt).toDateString()} </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode ? (
          <button className="singlePostButton" onClick={updateHandler}>
            Update
          </button>
        ) : (
          ""
        )}

        <div className="singlePostComments">
          <h2 className="singlePostTitle commentShower">Comments</h2>
          {comments.map((item) => (
            <div className="singlePostComment">
              <p className="singlePostInfo">{item.postedByUser}</p>
              <p className="singlePostDesc">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="commentAdder ">
          <form onSubmit={addComment}>
            <input
              type="text"
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment"
              className="singlePostTitleInput"
            />
            <button type="submit" className="singlePostButton">Add Comment </button>
          </form>
        </div>
      </div>
    </div>
  );
}
