import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8 bg-gradient-to-r from-rose-100 to-teal-100">
      <Container>
        <div className="grid grid-cols-1 md:flex flex-auto w-full flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-full md:w-1/2">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
