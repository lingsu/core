import { useContext } from "react";
import type { FC, PropsWithChildren } from "react";
import BladeContext from "../contexts/BladeContext";
import ReactBladeProvider from "../ReactBladeProvider";

const Wrapper: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const isWrapped = useContext(BladeContext);

  if (isWrapped) {
    // we need to wrap it with a fragment because it's not allowed for children to be a ReactNode
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051
    return <>{children}</>;
  }

  return <ReactBladeProvider>{children}</ReactBladeProvider>;
};

Wrapper.displayName = "ReactBladeWrapper";

export default Wrapper;
