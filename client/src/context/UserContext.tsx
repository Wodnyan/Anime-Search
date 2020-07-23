import React from "react";
import { User } from "../interfaces";

export const UserContext = React.createContext<User | null>(null);
