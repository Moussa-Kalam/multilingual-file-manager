/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
interface FetcherData {
  url: string;
  method?: "GET" | "POST" | "PATCH" | "OPTIONS" | "DELETE";
  body?: FormData | string;
}

const API_URL = "http://localhost:3000";

export const fetcher = async ({ url, method = "GET", body }: FetcherData) => {
  console.log("fetcher", { url, method, body });
  try {
    const headers: any = {};
    const token = localStorage.getItem("token")?.replace(/"/g, "");
console.log("token", token);
    typeof body === "string" && (headers["Content-Type"] = "application/json");

    token && (headers["Authorization"] = `Bearer ${token}`);

    const response = await fetch(`${API_URL}${url}`, {
      method,
      headers,
      body,
    });

    const data = await response.json();

    if (!response.ok) {
      throw { errorMessage: data.message, status: response.status };
    }

    return data;
  } catch (error) {
    throw error;
  }
};
