import { ImageContainer } from "./ImageContainer";
import { ImageUploader } from "./ImageUploader/ImageUploader";
import { Navbar } from "./Navbar/Navbar";

import "./styles.css";

export const Home = () => {
  return (
    <>
      <Navbar />
      <ImageUploader />
      <hr />
      <ImageContainer />
    </>
  );
};
