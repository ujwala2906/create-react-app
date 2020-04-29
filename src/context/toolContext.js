import React from "react";

const ToolContext = React.createContext()
const ToolContextProvider = ToolContext.Provider;
const ToolContextConsumer = ToolContext.Consumer;

export { ToolContext, ToolContextProvider, ToolContextConsumer }