import React, { useState, useCallback, FormEvent } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function Home() {
  const [suitImage, setSuitImage] = useState<string | null>(null);
  const [photoImage, setPhotoImage] = useState<string | null>(null);
  const [openUploadSuit, setOpenUploadSuit] = useState<boolean>(false);
  const [openUploadPerson, setOpenUploadPerson] = useState<boolean>(false);

  const onDropSuit = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles[0]) {
      setSuitImage(URL.createObjectURL(acceptedFiles[0]));
    }
  }, []);

  const onDropPhoto = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles[0]) {
      setPhotoImage(URL.createObjectURL(acceptedFiles[0]));
    }
  }, []);

  const suitDropzoneOptions: DropzoneOptions = {
    onDrop: onDropSuit,
    accept: {
      "image/*": []
    }
  };

  const photoDropzoneOptions: DropzoneOptions = {
    onDrop: onDropPhoto,
    accept: {
      "image/*": []
    }
  };

  const { getRootProps: getSuitRootProps, getInputProps: getSuitInputProps } =
    useDropzone(suitDropzoneOptions);
  const { getRootProps: getPhotoRootProps, getInputProps: getPhotoInputProps } =
    useDropzone(photoDropzoneOptions);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="w-full flex flex-col md:flex-row">
      <div className="bg-black w-full md:w-2/5 h-64 md:h-screen flex justify-center items-center">
        <img
          src={`${process.env.PUBLIC_URL}/assets/man.jpeg`}
          alt="Example person"
          className="max-h-full w-auto"
        />
      </div>
      <div className="bg-white w-full md:w-3/5 h-64 md:h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl text-center p-4">
          Upload the suit image and your photo to see how you look in the suit
        </h1>
        <form
          className="flex flex-col items-center p-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flox-row ">
            <div>
              {suitImage && (
                <img
                  src={suitImage}
                  alt="Suit Preview"
                  className="max-h-48 w-auto mt-2"
                />
              )}
              {openUploadSuit ? (
                <div
                  {...getSuitRootProps({ className: "dropzone w-full mb-2" })}
                >
                  <input {...getSuitInputProps()} />
                  <p className="text-sm text-gray-500 text-center p-2 border-dashed border-2 border-gray-300 cursor-pointer">
                    Drag and drop a suit image here, or click to select one
                  </p>
                </div>
              ) : (
                <FaCloudUploadAlt
                  className="text-5xl text-gray-500 cursor-pointer"
                  onClick={() => setOpenUploadSuit(true)}
                />
              )}
            </div>
            <div>
              {photoImage && (
                <img
                  src={photoImage}
                  alt="Your photo"
                  className="max-h-48 w-auto mt-2"
                />
              )}
              <div
                {...getPhotoRootProps({ className: "dropzone w-full mb-2" })}
              >
                <input {...getPhotoInputProps()} />
                <p className="text-sm text-gray-500 text-center p-2 border-dashed border-2 border-gray-300 cursor-pointer">
                  Drag and drop your photo here, or click to select one
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-black text-white p-2 rounded mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
