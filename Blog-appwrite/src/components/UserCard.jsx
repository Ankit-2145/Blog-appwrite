import React, { useState } from "react";
import appwriteService from "../appwrite/config";
import parse from "html-react-parser";
import { Button } from "./index";
import moment from "moment";

const PostCard = ({ $id, title, featuredImage, content, $createdAt }) => {
  const [mediaExists, setMediaExists] = useState(true);
  const formattedDate = moment($createdAt).format(
    "dddd, MMMM Do, YYYY [at] h:mm A"
  );

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

  return (
    <div>
      <div className="bg-white border border-gray-200 rounded-lg shadow">
        <div className="p-5">
          <h5 className="mb-4 text-2xl font-semibold tracking-tight text-slate-700">
            {title}
          </h5>
          <span className="font-medium mb-4 text-slate-500">
            {parse(content)}
          </span>

          {featuredImage && (
            <Button
              onClick={handleDownload}
              className="inline-flex items-center mt-5 px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none"
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

          <p className="text-sm text-right mt-3 text-slate-400 italic">
            Uploaded on: {formattedDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
