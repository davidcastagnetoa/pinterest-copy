import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { client } from "../client";
import Spinner from "./Spinner";

import { categories } from "../utils/data";
// categories [{ name: 'sports', image: ''}]

const CreatePin = ({ user }) => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];

    if (
      type === "image/png" ||
      type === "image/jpeg" ||
      type === "image/gif" ||
      type === "image/svg"
    ) {
      setWrongImageType(false);
      setLoading(true);

      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Image Upload Error", error);
        });
    } else {
      setWrongImageType(true);
    }
  };

  const savePin = () => {
    if (title && about && imageAsset?._id && category || destination ) {
      const doc = {
        _type: "pin",
        title,
        about,
        destination,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: "postedBy",
          _ref: user._id,
        },
        category,
      };

      client.create(doc)
        .then(() => {
          navigate('/')
        })
    } else {
      setFields(true);
      setTimeout(() => {
        setFields(false)
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-6/7">
      {fields && (
        <p className="text-red-500 dark:text-gh_bg_button mb-5 text-xl transition-all duration-150 ease-in">
          Please fill all the fields.
        </p>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-center bg-sd_l_bg_default dark:bg-gh-bg-default lg:p-5 p-3 lg:w-6/7 w-full">
        {/* Upload Banner */}
        <div className="bg-sd_l_bg_primary_2 dark:bg-gh-bg-secondary p-3 flex flex-1 w-full rounded-lg">
          {/* Border dotted Rectangle */}
          <div className="flex justify-center items-center flex-col border-2 rounded-lg border-dotted border-gray-300 dark:border-slate-800/70 p-3 w-full h-420">
            {loading && <Spinner />}
            {wrongImageType && <p>Wrong image type</p>}
            {!imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full cursor-pointer">
                  <div className="flex flex-col items-center justify-center">
                    <p className="font-bold text-2xl text-gh_l_bg_button dark:text-gh_bg_button cursor-pointer">
                      <AiOutlineCloudUpload fontSize={35} />
                    </p>
                    <p className="text-lg">Click to Upload</p>
                  </div>
                  <p className="mt-28 px-8 text-black dark:text-gray-400 text-center">
                    Use hight-quality .JPG, .SVG, .PNG, .GIF, or .TIFF less than
                    20 MB
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={imageAsset?.url}
                  alt="uploaded-pic"
                  className="h-full w-full object-contain"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-2 rounded-full bg-sd_l_bg_button text-xl courser-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete fontSize={25} className="text-white" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add your title here"
            className="outline-none rounded-lg text-base sm:text-md p-2 w-full bg-sd_l_bg_primary dark:bg-gh-bg-primary placeholder:italic placeholder:text-slate-600 dark:placeholder:text-gray-500"
          />
          {user && (
            <div className="flex gap-2 items-center dark:bg-gh-bg-default bg-sd_l_bg_default rounded-lg">
              <img
                src={user.image}
                alt="user-profile"
                className="w-10 h-10 rounded-full"
              />
              <p className="font-bold">{user.userName}</p>
            </div>
          )}
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="What is your pin about"
            className="outline-none rounded-lg text-base sm:text-sm p-2 w-full bg-sd_l_bg_primary dark:bg-gh-bg-primary placeholder:italic placeholder:text-slate-600 dark:placeholder:text-gray-500"
          />
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Add a url link"
            className="outline-none rounded-lg text-base sm:text-sm p-2 w-full bg-sd_l_bg_primary dark:bg-gh-bg-primary placeholder:italic placeholder:text-slate-600 dark:placeholder:text-gray-500"
          />
          <div className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold text-base sm:tex-xl">
                Choose a Pin Category
              </p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="outline-none w-3/5 text-base border-b rounded-md cursor-po inter bg-sd_l_bg_primary dark:bg-gh-bg-primary dark:border-slate-800/70"
              >
                <option
                  value="other"
                  className="bg-sd_l_bg_default dark:bg-gh-bg-secondary"
                >
                  Select Category
                </option>
                {categories.map((category) => (
                  <option
                    className="text-base border-0 outline-none capitalize bg-sd_l_bg_default dark:bg-gh-bg-default"
                    value={category.name}
                    key={category.name}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end items-end mt-5">
              <button
                type="button"
                onClick={savePin}
                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
              >
                Save Pin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
