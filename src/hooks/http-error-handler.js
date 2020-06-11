import { useState, useEffect } from "react";

export default (httpClient) => {
  const [isError, setIsError] = useState(null);

  const reqInterceptor = httpClient.interceptors.request.use((req) => {
    setIsError(null);
    return req;
  });

  const resInterceptor = httpClient.interceptors.response.use(
    (res) => res,
    (error) => {
      setIsError(error);
    }
  );

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor]);

  const errorConfirmedHandler = () => {
    setIsError(null);
  };

  return [isError, errorConfirmedHandler];
};
