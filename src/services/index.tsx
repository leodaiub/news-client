import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization:
      typeof localStorage !== "undefined"
        ? "Bearer " + localStorage?.getItem("token")
        : null,
  },
});

export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);
