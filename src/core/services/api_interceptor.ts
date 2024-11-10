import { toast } from "react-toastify";

const getCookieValue = (name: string): string | null => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
};

const baseInterceptor = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getCookieValue("token"); // Retrieve the token from cookies
  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  headers.set("Content-Type", "application/json");

  const modifiedOptions: RequestInit = {
    ...options,
    headers: headers,
    mode: "cors",
    credentials: "include",
  };

  try {
    const response = await fetch(url, modifiedOptions);

    if (response.status === 401) {
      toast.error("You are not authorized to access this page", {
        theme: "dark",
      });
      window.location.href = "/login";
    } else if (response.status === 500) {
      const res = response;
      const data = await res.json();
      toast.error(data.message, {
        theme: "dark",
      });
    }

    return response;
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
};

export default baseInterceptor;
