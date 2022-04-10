import { Link } from "react-router-dom";
import "./post.css";

// https://via.placeholder.com/150"

export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((cat) => {
            return <span className="postCat">{cat.name}</span>;
          })}
          </div>
         
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>

        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>

        <div className="postBody">
        <i class="fa-solid fa-heart"></i>
          {post.likes}
          </div>

      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}
