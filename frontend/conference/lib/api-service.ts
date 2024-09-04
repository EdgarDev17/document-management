import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://conferencesapi.somee.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});
