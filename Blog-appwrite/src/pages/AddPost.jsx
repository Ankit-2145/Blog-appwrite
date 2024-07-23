import React from "react";
import { Container, PostForm } from "../components";

const AddPost = () => {
  return (
    <div className="py-8 bg-gradient-to-r from-rose-100 to-teal-100 ">
      <Container>
        <PostForm />
      </Container>
    </div>
  );
};

export default AddPost;
