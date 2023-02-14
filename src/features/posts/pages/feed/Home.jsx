import { useEffect, useState } from "react";
import { Post } from "../../../../common/components/Post";
import { getFeed, unlikePost, likePost } from "../../postSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../common/assets/loading.png";
import { isAuthenticated } from "../../../auth/authSlice";

export const Home = () => {
  const [createPost, setCreatePost] = useState(false);
  const [showPost, setShowPost] = useState(true);

  const userId = useSelector((state) => state.auth.data._id);
  const posts = useSelector((state) => state.post.feedPost);
  const token = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.post.postLoading);
  const dispatch = useDispatch();
  console.log(userId);

  useEffect(() => {
    if (token) {
      dispatch(getFeed({ token }));
    }
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(isAuthenticated());
  }, []);

  console.log(posts);

  return (
    <div>
      {loading === true ? (
        <div>
          <img src={Loading} alt="loading" />
        </div>
      ) : (
        <div>
          {!createPost && (
            <div className="btn-container">
              <button
                className="post-btn"
                onClick={() => {
                  setCreatePost(true);
                  setShowPost(false);
                }}
              >
                Post
              </button>
            </div>
          )}
          {showPost && (
            <div>
              <div>
                {posts?.map((post) => {
                  return (
                    <div key={post._id} className="card">
                      <p className="post-userName">@{post?.userId?.username}</p>
                      <img
                        className="post"
                        src={post?.userId?.profileURL}
                        alt="profile"
                      />
                      <p className="post-name">{post?.userId?.name}</p>
                      <img
                        className="post-image"
                        src={post?.postImage}
                        alt="post-img"
                      />
                      <p className="post-content">{post?.content}</p>
                      <p className="post-content">
                        {post?.likedBy.length} likes
                      </p>
                      {post?.likedBy?.find((user) => user._id === userId) ? (
                        <button
                          className="posts-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            let postId = post._id;

                            dispatch(unlikePost({ postId, userId, token }));
                          }}
                        >
                          unlike
                        </button>
                      ) : (
                        <button
                          className="posts-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            let postId = post._id;
                            dispatch(likePost({ postId, userId, token }));
                          }}
                        >
                          like
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {createPost && (
            <Post setCreatePost={setCreatePost} setShowPost={setShowPost} />
          )}
        </div>
      )}
    </div>
  );
};
