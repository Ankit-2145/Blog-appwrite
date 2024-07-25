import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/all-posts`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      // if (file) {
      //   const fileId = file.$id;
      //   data.featuredImage = fileId;
      //   const dbPost = await appwriteService.createPost({
      //     ...data,
      //     userId: userData.$id,
      //   });
      //   toast.success("Notice added successfully");
      //   setTimeout(() => {
      //     if (dbPost) {
      //       navigate(`/all-posts`);
      //     }
      //   }, 1500);
      // }

      if (file) {
        const fileId = file.$id;
        if (fileId) {
          data.featuredImage = fileId;
        } else {
          console.error("File ID is undefined");
        }
      } else {
        console.log("No file provided");
      }

      const dbPost = await appwriteService.createPost({
        ...data,
        userId: userData.$id,
      });

      toast.success("Notice added successfully");

      setTimeout(() => {
        if (dbPost) {
          navigate(`/all-posts`);
        }
      }, 1500);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col-reverse md:flex-row flex-wrap"
    >
      <div className="w-full md:w-2/3 px-2">
        <Input
          label="Title:"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug:"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content:"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
        <Input
          label="Featured Image:"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif, application/pdf"
          {...register("image")}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt="No media file was uploaded"
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status:"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          className="w-full my-2 hover:bg-blue-700 text-white"
        >
          {post ? "Update Notice" : "Add Notice"}
        </Button>
      </div>
      <div className="w-full md:w-1/3 pl-3 py-8">
        <div className="block max-w-sm mx-auto md:mx-0 p-6 bg-white border border-gray-200 rounded-lg shadow">
          <div
            className="flex p-2 text-sm text-blue-500 rounded-lg bg-blue-50"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="text-base font-medium">
                Ensure that these requirements are met:
              </span>
              <ul className="text-base my-1.5 list-disc">
                <li>
                  Title Should not exceed more than 6 words (Keep it short and
                  concise).
                </li>
                <li>Do not write anything in slug, it is set to autofill.</li>
                <li>
                  In Content the word limit is upto 30 words, word count is
                  provided, Please do not exceed the limit.
                </li>
                <li>
                  In Featured Image, upload the image/Pdf which you want to
                  share.
                </li>
                <li>
                  In Status, keep it active to show the notice or set to
                  inactive to hide it, if you don't want to delete it.
                </li>
                <li>
                  Remember that all fields are compulsory to fill except
                  featured Image.
                </li>
                <p className="my-4">
                  Remember to meet these requirements or else the notice will
                  not be Added.
                </p>
              </ul>
            </div>
          </div>
        </div>
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
    </form>
  );
}
