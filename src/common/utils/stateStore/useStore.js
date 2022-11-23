import create from "zustand";
import createToggleVisibility from "./slices/createToggleVisibility";

//// main store for global state////
const useStore = create((set, get) => ({
  ...createToggleVisibility(set, get),
}));

export default useStore;
