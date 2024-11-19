import { createContext } from "react";
import { SnackbarReturnValues } from "../utils/types";

export const SnackbarContext = createContext<SnackbarReturnValues>({} as SnackbarReturnValues);