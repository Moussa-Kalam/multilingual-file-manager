interface FetcherData {
  url: string;
  method?: "GET" | "POST" | "PATCH" | "OPTIONS" | "DELETE";
  body?: FormData | string;
}

const API_URL = "";

export const fetcher = async ({ url, method, body }: FetcherData) => {
  try {
    let headers: any = {};
    const token = localStorage.getItem("token")?.replace(/"/g, "");

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
