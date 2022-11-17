export const imagesReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_IMAGE":
      return [payload, ...state];

    case "REMOVE_IMAGE":
      let newImages = [...state].filter((image) => image._id != payload._id);
      return [...newImages];

    case "SET_IMAGES":
      return [...payload];
    case "RESET_GALLERY":
      return [];
    default:
      return state;
  }
};
