import React from "react";
import Grad15 from "../assets/Grad_15.png";

const Home = () => {
  return (
    <>
      <section className="">
        <div className="my-auto px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h1 className="text-4xl md:text-5xl mt-32 font-semibold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Welcome to the School Dashboard: Seamlessly Update Your Notice Board
          </h1>
          <p className="my-8 text-lg font-normal text-gray-600 lg:text-xl sm:px-16 xl:px-48">
            Effortlessly Manage School Announcements and Keep Everyone Informed
            in Real-Time
          </p>
          <div className="flex mb-8 lg:mb-16 space-y-4 sm:flex-row justify-center sm:space-y-0 sm:space-x-4">
            <a
              href="#"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-gray-300 bg-blue-500 hover:border-blue-500 hover:text-blue-500 hover:bg-transparent focus:ring-4 focus:ring-gray-100"
            >
              <svg
                className="mr-2 -ml-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
              </svg>
              Watch video
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
