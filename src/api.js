import axios from "axios";

export const API_URL = `http://localhost:3000/data`;

export const $axios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
