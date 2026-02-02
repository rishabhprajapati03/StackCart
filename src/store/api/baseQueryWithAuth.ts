import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "../../services/authService";

export const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: "https://stackcartbackend-production.up.railway.app/api",
  prepareHeaders: async (headers) => {
    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken();
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});
