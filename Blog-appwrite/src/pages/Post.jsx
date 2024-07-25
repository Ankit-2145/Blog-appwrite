import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        toast.error("Notice deleted successfully");
        setTimeout(() => {
          navigate("/all-posts");
        }, 1000);
      }
    });
  };

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <div className="max-w-md mx-auto  flex justify-center mb-4 relative rounded-xl p-2">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl w-1/2"
          />
        </div>
        <div className="w-fit mx-auto mb-6 bg-white text-center rounded-md p-8 shadow">
          <h1 className="text-2xl font-bold text-slate-700">{post.title}</h1>
          <div className="max-w-md browser-css text-center font-medium text-slate-500 my-5">
            {parse(post.content)}
          </div>
          {isAuthor && (
            <div>
              <Link to={`/edit-post/${post.$id}`}>
                <Button className="inline-flex items-center mt-6 ml-3 text-sm font-medium text-center bg-green-500 border-2 hover:border-green-500 rounded-lg hover:text-green-500 hover:bg-transparent text-white">
                  Edit Notice
                  <svg
                    className="w-4 h-4 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                    />
                  </svg>
                </Button>
              </Link>
            </div>
          )}
          <Button
            onClick={deletePost}
            className="inline-flex items-center mt-5 ml-3 text-sm font-medium text-center text-red-500 border-2 border-red-500 bg-transparent rounded-lg hover:bg-red-500 hover:text-white"
          >
            Delete Notice
            <svg
              className="w-4 h-4 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="m6 6 12 12m3-6a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </Button>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce
        />
      </Container>
    </div>
  ) : null;
}
