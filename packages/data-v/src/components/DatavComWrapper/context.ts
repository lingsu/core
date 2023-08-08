import React, { RefObject } from "react";

export const DatavComWrapperContext = React.createContext({
  container: null,
} as { container: RefObject<HTMLDivElement> | null });

export const DatavComWrapperContextProvider = DatavComWrapperContext.Provider;
