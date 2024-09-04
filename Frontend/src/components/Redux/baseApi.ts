import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "next/headers";
import { RootState } from "./store";
import { getFromLocalStorage } from "../UtlitiFunction/localStorage";

const baseQueryF = fetchBaseQuery({
  baseUrl: "https://manage-property-system-server.vercel.app/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // const token = (getState() as RootState).auth.accessToken;
    // const token = (getState() as RootState).auth.accessToken;
    const token=getFromLocalStorage('token')
    if (token) {
      headers.set("authorization", token);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryF,
  tagTypes: ["property","reviews","technology", "banner", "project", "profile", "blog"],
  endpoints: () => ({}),
});
