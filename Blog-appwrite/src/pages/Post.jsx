import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  return post ? (
    <div className="py-8 bg-gradient-to-r from-rose-100 to-teal-100">
      <Container>
        <div className="max-w-md mx-auto  flex justify-center mb-4 relative rounded-xl p-2">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl w-1/2"
          />
        </div>
        <div className="w-fit mx-auto mb-6 bg-white text-center rounded-md p-8">
          <h1 className="text-2xl font-bold text-black">{post.title}</h1>
          <div className="browser-css text-center text-black my-3">
            {parse(post.content)}
          </div>
          {isAuthor && (
            <div>
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit Notice
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Container>
    </div>
  ) : null;
}
