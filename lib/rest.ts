import axios, { AxiosError } from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

// Tipe metode HTTP yang didukung
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

// Tipe opsional untuk body (bisa berupa objek JSON atau FormData)
type RequestBody = Record<string, unknown> | FormData | undefined;

export async function restAPI<TResponse>(
  method: HTTPMethod,
  url: string,
  body?: RequestBody
): Promise<TResponse> {
  let token = "";

  if (typeof window !== "undefined") {
    const tokenMeta = document.querySelector('meta[name="csrf-token"]');
    token = tokenMeta?.getAttribute("content") || "";
  }

  const headers: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  const fullUrl = `${API_BASE_URL}${url}`;

  try {
    switch (method) {
      case "GET": {
        const res = await axios.get<TResponse>(fullUrl, {
          headers,
          params: body,
        });
        return res.data;
      }
      case "POST": {
        const res = await axios.post<TResponse>(fullUrl, body, { headers });
        return res.data;
      }
      case "PUT": {
        const res = await axios.put<TResponse>(fullUrl, body, { headers });
        return res.data;
      }
      case "DELETE": {
        const res = await axios.delete<TResponse>(fullUrl, {
          headers,
          params: body,
        });
        return res.data;
      }
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  } catch (err) {
    const error = err as AxiosError;
    console.error("API Error:", error.message);
    throw error;
  }
}
