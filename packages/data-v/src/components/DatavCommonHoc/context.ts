import React from "react";

export const DatavDataSourceContext = React.createContext({
  data: null,
} as { data: any });

export const DatavDataSourceContextProvider = DatavDataSourceContext.Provider;
