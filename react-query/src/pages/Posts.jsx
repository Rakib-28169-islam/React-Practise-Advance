import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUsers = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
};
const fetchPosts = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data;
};
const Posts = () => {
  const {
    data: users,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const getName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user?.name : "Unknown User";
  };

  if (isUserLoading || isPostLoading) return <p>Loading...</p>;
  if (isUserError || isPostError) return <p>Something went wrong!</p>;

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: "1rem", padding: "1rem", border: "1px solid #ccc" ,color:"white"}}>
            <div>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <p>Author: {getName(post.userId)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
