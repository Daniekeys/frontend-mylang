import React, { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import { Button } from "../Button";
import toast from "react-hot-toast";
import { baseUrl } from "../../util/endpoints";
const apiEndpoint =
  `${baseUrl}/file-upload`;
interface ImageUploadProps {
  imageUrl: string;
  setImageUrl: (url: string) => void;
}

const VideoUpload: React.FC<ImageUploadProps> = ({ imageUrl, setImageUrl }) => {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  console.log(imageUrl)
  useEffect(() => {
    if (image) {
      handleImageUpload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      if (selectedImage.size > 20 * 1048576) {
        // 1MB in bytes
        toast.error("File size exceeds 20MB. Please upload a smaller file.");
      } else {
        setImage(selectedImage);
      }
    }
  };

  const handleImageUpload = async () => {
    if (!image) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post(apiEndpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setImageUrl(response.data.url);

      setLoading(false);
    } catch (error) {
      console.error("Error uploading video:", error);
      toast.error("Error uploading video. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full  max-h-fit border border-dashed border-border flex items-center justify-center rounded-md ">
        {imageUrl ? (
          <video
            src={imageUrl}
            className="w-full h-full max-h-[800px] object-cover  "
            
            controls
            
          />
        ) : (
          <div className="flex flex-col items-center justify-center ">
            <Button name="Upload" />
            <span className="text-[#94A3B8] mt-2 inter text-xs">
              Drag and drop video, 20mb max.
            </span>
          </div>
        )}
        {!imageUrl && (
          <input
            type="file"
            accept="video/*"
            className="absolute w-full h-full opacity-0 cursor-pointer inset-0"
            onChange={handleImageChange}
          />
        )}
      </div>
      {imageUrl && (
        <div className="relative flex items-start justify-start w-full mt-4">
          <Button name="Upload Another" />
          <input
            type="file"
            accept="video/*"
            className="absolute w-full h-full opacity-0 cursor-pointer inset-0"
            onChange={handleImageChange}
          />
        </div>
      )}
      {loading && <p className="mt-2 text-blue-500">Uploading...</p>}
    </div>
  );
};

export default VideoUpload;
