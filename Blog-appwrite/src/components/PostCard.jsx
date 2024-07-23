import React, { useState } from "react";
import appwriteService from "../appwrite/config";
import { Link, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import { Button } from "./index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostCard = ({ $id, title, featuredImage, content }) => {
  const navigate = useNavigate();
  const [mediaExists, setMediaExists] = useState(true);

  const handleDownload = async () => {
    if (!featuredImage) {
      setMediaExists(false);
      return;
    }
    try {
      appwriteService.downloadFile(featuredImage);
    } catch (error) {
      setMediaExists(false);
    }
  };

  const deletePost = () => {
    appwriteService.deletePost($id).then((status) => {
      if (status) {
        appwriteService.deleteFile(featuredImage);
        navigate("/all-posts");
        window.location.reload();
      }
    });
    toast.error("Notice Deleted Successfully");
  };

  return (
    <Link>
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow">
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {title}
          </h5>
          <span className="mb-3 font-normal text-gray-700">
            {parse(content)}
          </span>

          {!mediaExists ? (
            <Button
              onClick={handleDownload}
              className="inline-flex items-center mt-3 px-4 py-2 text-sm font-medium text-center text-white bg-yellow-400 rounded-lg hover:bg-yellow-500 focus:outline-none"
            >
              No Media Added
              <svg
                className="w-6 h-6 ms-2"
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
                  d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </Button>
          ) : (
            <Button
              onClick={handleDownload}
              className="inline-flex items-center mt-3 px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none"
            >
              Download Media
              <svg
                className="rotate-90 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Button>
          )}

          <Button
            onClick={deletePost}
            className="inline-flex items-center mt-3 ml-3 px-4 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none"
          >
            Delete Notice
            <svg
              className="w-6 h-6 ms-2"
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

          <Button
            onClick={deletePost}
            className="inline-flex items-center mt-3 ml-3 px-4 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none"
          >
            Edit Notice
            <svg
              className="w-6 h-6 ms-2"
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
      </div>
    </Link>
  );
};

export default PostCard;
