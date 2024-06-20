import React, { useState, useCallback, FormEvent } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { submitForm } from "../services/apiServices";
import * as yup from 'yup';
import { useSnackbar } from 'notistack';

const Home: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [suitImage, setSuitImage] = useState<File | null>(null);
  const [photoImage, setPhotoImage] = useState<File | null>(null);
  const [garmentDes, setGarmentDes] = useState<string>("");
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onDropSuit = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles[0]) {
      setSuitImage(acceptedFiles[0]);
    }
  }, []);

  const onDropPhoto = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles[0]) {
      setPhotoImage(acceptedFiles[0]);
    }
  }, []);

  const suitDropzoneOptions: DropzoneOptions = {
    onDrop: onDropSuit,
    accept: {
      "image/*": [],
    },
  };

  const photoDropzoneOptions: DropzoneOptions = {
    onDrop: onDropPhoto,
    accept: {
      "image/*": [],
    },
  };

  const {
    getRootProps: getSuitRootProps,
    getInputProps: getSuitInputProps,
  } = useDropzone(suitDropzoneOptions);
  const {
    getRootProps: getPhotoRootProps,
    getInputProps: getPhotoInputProps,
  } = useDropzone(photoDropzoneOptions);

  const validationSchema = yup.object().shape({
    suitImage: yup
      .mixed()
      .required("Please provide a suit image."),
    photoImage: yup
      .mixed()
      .required("Please provide your photo."),
    garmentDes: yup
      .string()
      .required("Please describe the garment.")
      .max(200, "Garment description should not exceed 200 characters."),
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      await validationSchema.validate({ suitImage, photoImage, garmentDes }, { abortEarly: false });
      setIsLoading(true);
      
      // Assuming submitForm is a mock function since it's not fully implemented here
      const result = await submitForm(suitImage!, photoImage!, garmentDes);
      setResultImage(result);
      enqueueSnackbar("Image successfully loaded!", { variant: 'success' });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.errors.forEach(err => enqueueSnackbar(err, { variant: 'error' }));
      } else {
        enqueueSnackbar("An unexpected error occurred", { variant: 'error' });
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex flex-wrap h-screen">
      <div className="bg-white w-full md:w-3/5 flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl md:text-4xl text-center font-semibold pb-28">
          See How You Look in the Suit
        </h1>
        <form className="flex flex-col items-start w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="flex flex-col items-center w-full md:w-1/2">
              {suitImage && (
                <img
                  src={URL.createObjectURL(suitImage)}
                  alt="Suit Preview"
                  className="max-h-48 w-auto mt-2 rounded-md shadow-md"
                />
              )}
              <div {...getSuitRootProps({ className: "dropzone w-full mt-2" })}>
                <input {...getSuitInputProps()} />
                <p className="text-sm text-gray-500 text-center p-4 border-dashed border-2 border-gray-300 cursor-pointer hover:border-gray-400 focus:border-gray-400 transition duration-200 rounded-md">
                  Drag and drop a suit image here, or click to select one
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center w-full md:w-1/2">
              {photoImage && (
                <img
                  src={URL.createObjectURL(photoImage)}
                  alt="Your photo"
                  className="max-h-48 w-auto mt-2 rounded-md shadow-md"
                />
              )}
              <div {...getPhotoRootProps({ className: "dropzone w-full mt-2" })}>
                <input {...getPhotoInputProps()} />
                <p className="text-sm text-gray-500 text-center p-4 border-dashed border-2 border-gray-300 cursor-pointer hover:border-gray-400 focus:border-gray-400 transition duration-200 rounded-md">
                  Drag and drop your photo here, or click to select one
                </p>
              </div>
            </div>
          </div>
          <input
            type="text"
            placeholder="Describe the garment"
            value={garmentDes}
            onChange={(e) => setGarmentDes(e.target.value)}
            className="border border-gray-300 p-2 rounded mt-4"
          />
          <button
            type="submit"
            className={`bg-black text-white p-3 px-6 rounded mt-4 transition duration-200 ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-800'}`}
            disabled={isLoading}
          >
            {isLoading ? "Loading Image..." : "Submit"}
          </button>
        </form>
      </div>
      <div className="w-full md:w-2/5 h-screen flex justify-center items-center md:p-5">
        <img
          src={resultImage ? resultImage : `${process.env.PUBLIC_URL}/assets/man.jpeg`}
          alt="Example person"
          className="max-h-full w-auto rounded-md shadow-md"
        />
      </div>
    </div>
  );
};

export default Home;
