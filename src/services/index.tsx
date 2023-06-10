import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    withCredentials: true,
    credentials: "include",
  },
  withCredentials: true,
});

export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);
