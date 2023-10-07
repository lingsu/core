import { useContext } from "react";
import BladeContext from "../contexts/BladeContext";

const useReactBlade = () => {
  const store = useContext(BladeContext);

  return store!;
};

export default useReactBlade;
