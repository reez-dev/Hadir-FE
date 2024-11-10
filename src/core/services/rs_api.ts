import baseInterceptor from "./api_interceptor";

interface RsAPIProps<Type> {
  get: (props: {
    url: string;
    param?: Record<string, object>;
  }) => Promise<Type>;
  post: (props: { url: string; data: Record<string, object> }) => Promise<Type>;
  put: (props: {
    url: string;
    data: Record<string, object>;
    id: string;
  }) => Promise<Type>;
  delete: (props: { url: string; id: string; token: string }) => Promise<Type>;
  patch: (props: {
    url: string;
    data: Record<string, object>;
    id: string;
  }) => Promise<Type>;
  list: (props: {
    url: string;
    size: number;
    page: number;
    sort: string;
    sortBy: string;
    search: string;
    other: Record<string, object>;
  }) => Promise<Type>;
  show: (props: { url: string; id: string; token: string }) => Promise<Type>;
}

const RsAPI = <Type>(): RsAPIProps<Type> => {
  const get = async (props: {
    url: string;
    param?: Record<string, object>;
  }) => {
    const { url, param } = props;
    const response = await baseInterceptor(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${url}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
      }
    );
    return response.json();
  };

  const post = async (props: { url: string; data: Record<string, object> }) => {
    const { url, data } = props;
    const response = await baseInterceptor(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${url}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return response.json();
  };

  const put = async (props: {
    url: string;
    data: Record<string, object>;
    id: string;
  }) => {
    const { url, data, id } = props;
    const response = await baseInterceptor(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${url}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return response.json();
  };

  const deleteData = async (props: { url: string; id: string }) => {
    const { url, id } = props;
    const response = await baseInterceptor(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${url}/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.json();
  };

  const patch = async (props: {
    url: string;
    data: Record<string, object>;
    id: string;
  }) => {
    const { url, data, id } = props;
    const response = await baseInterceptor(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${url}/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    return response.json();
  };

  const list = async (props: {
    url: string;
    size: number;
    page: number;
    sort: string;
    sortBy: string;
    search: string;
    other: Record<string, object>;
  }) => {
    const { url, size, page, sort, sortBy, search, other } = props;
    const response = await baseInterceptor(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${url}?size=${size}&page=${page}&sort=${sort}&sortBy=${sortBy}&search=${search}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(other),
      }
    );
    return response.json();
  };

  const show = async (props: { url: string; id: string }) => {
    const { url, id } = props;
    const response = await baseInterceptor(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${url}/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.json();
  };

  return { get, post, put, delete: deleteData, patch, list, show };
};

export default RsAPI;
