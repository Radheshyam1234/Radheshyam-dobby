import { createContext, useContext, useReducer } from "react";
import { imagesReducer } from "./imageReducer";

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [imagesState, imagesDispatch] = useReducer(imagesReducer, []);

  return (
    <ImageContext.Provider value={{ imagesState, imagesDispatch }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageProvider = () => useContext(ImageContext);
