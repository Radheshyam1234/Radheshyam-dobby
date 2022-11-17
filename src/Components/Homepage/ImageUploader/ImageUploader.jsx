import { useState } from "react";
import { uploadImagesToDb } from "../../../utilities/backendRequests";
import { useImageProvider } from "../../../Context/ImageContext/ImageProvider";
import "./imageUploader.css";

export const uploadImageToCloudinary = async (image) => {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "insta-clone");
  data.append("cloud_name", "radheshyam11");

  let result;

  await fetch("https://api.cloudinary.com/v1_1/radheshyam11/image/upload", {
    method: "post",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      result = data;
    })
    .catch((error) => {
      return error;
    });

  return result;
};

export const ImageUploader = () => {
  const { imagesDispatch } = useImageProvider();
  const [seeInputImage, setSeeInputImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [media, setMedia] = useState();
  const [title, setTitle] = useState("");

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    setMedia(file);
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    let base64File = await toBase64(file);
    setSeeInputImage(base64File);
  };

  const uploadImage = async () => {
    if (!title) {
      alert("Image Title is required");
      return;
    }
    setUploadingImage(true);
    try {
      const data = await uploadImageToCloudinary(media);
      if (data) {
        uploadImagesToDb({ title, photo: data.url }, imagesDispatch);
      } else {
        alert("Something went wrong");
        setUploadingImage(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUploadingImage(false);
      setSeeInputImage("");
      setTitle("");
    }
  };

  return (
    <>
      <main className="main_full">
        <div className="container">
          <div className="panel">
            <div className="button_outer">
              <div className="btn_add">
                <input
                  type="file"
                  accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/jpg,image/webp"
                  onChange={onFileChange}
                />
                Choose Image
              </div>
            </div>
          </div>

          {seeInputImage && (
            <>
              <h3>Preview Image </h3>
              <div className="uploaded_file_view" id="uploaded_view">
                <input
                  type="text"
                  placeholder="image-title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />

                <img src={seeInputImage} alt="pic" />
                <span
                  className="file_remove"
                  onClick={() => {
                    setSeeInputImage("");
                    setTitle("");
                  }}
                >
                  X
                </span>
                {uploadingImage ? (
                  "Uploading ...."
                ) : (
                  <button className="btn_upload" onClick={uploadImage}>
                    Upload
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};
