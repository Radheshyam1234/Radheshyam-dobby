import axios from "axios";
import { API_URL } from "./ApiUrl";

export const uploadImagesToDb = async (
  { title, photo },
  imagesDispatch,
  setUploadingImage
) => {
  try {
    const {
      data: { response },
    } = await axios({
      method: "POST",
      url: `${API_URL}/images/image`,
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {
        title,
        photo,
      },
    });

    imagesDispatch({ type: "ADD_IMAGE", payload: response });
  } catch (error) {
    console.log(error);
  } finally {
    setUploadingImage(false);
  }
};

export const removeImageFromDb = async (image, imagesDispatch) => {
  try {
    const {
      data: { response },
    } = await axios({
      method: "DELETE",
      url: `${API_URL}/images/${image._id}`,
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    imagesDispatch({ type: "REMOVE_IMAGE", payload: response });
  } catch (error) {
    console.log(error);
  }
};

export const getAllImagesOfUser = async (imageDispatch) => {
  try {
    const {
      data: { response },
    } = await axios({
      method: "GET",
      url: `${API_URL}/images/image`,
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    imageDispatch({ type: "SET_IMAGES", payload: response });
  } catch (error) {
    console.log(error);
  }
};
