import * as React from "react";
import { Provider } from "../contexts/BladeContext";
import defaultConfig from "../defaultConfig";
import { DefaultOption, createInstance } from "../utils/request";
import { createServices } from "../services";

const ReactBladeProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [value, setValue] = React.useState({ ...defaultConfig });
  const store = React.useMemo(() => {
    const request = () => {
      const instance = createInstance({
        ...DefaultOption,
        baseURL: value.apiUrl,
        uploadUrl: value.uploadUrl,
      });
      return instance;
    };
    const req = request();
    return {
      ...value,
      setState: (state: any) => {
        setValue((pre) => ({ ...pre, ...state }));
      },
      request: req,
      services: createServices(req, value),
    };
  }, [value]);

  return <Provider value={store}>{children}</Provider>;
};

ReactBladeProvider.displayName = "ReactBladeProvider";

export default ReactBladeProvider;
