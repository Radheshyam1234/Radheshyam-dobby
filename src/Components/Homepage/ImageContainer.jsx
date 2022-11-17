import { useEffect, useState } from "react";
import { useImageProvider } from "../../Context/ImageContext/ImageProvider";
import {
  getAllImagesOfUser,
  removeImageFromDb,
} from "../../utilities/backendRequests";

const filteredImages = (images, search) => {
  return images.filter((image) =>
    image.title.toLowerCase().includes(search.toLowerCase())
  );
};

export const ImageContainer = () => {
  const { imagesState, imagesDispatch } = useImageProvider();
  const [search, setSearch] = useState("");
  useEffect(() => {
    getAllImagesOfUser(imagesDispatch);
  }, []);

  return (
    <>
      <center style={{ color: "red", fontSize: "25px" }}>Uploaded Image</center>

      <div className="search-bar">
        <input
          placeholder="search-image"
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>

      <div className="image_container">
        {imagesState.length > 0
          ? filteredImages(imagesState, search)?.map((image, index) => {
              return (
                <div className="image_wrapper">
                  <center>{image.title}</center>
                  <img src={image.photo} alt="img" key={index} />
                  <button
                    onClick={() => {
                      removeImageFromDb(image, imagesDispatch);
                    }}
                  >
                    Remove
                  </button>
                </div>
              );
            })
          : "No Image Uploaded"}
      </div>
    </>
  );
};
