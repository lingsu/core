import {
  ErrorBoundary,
  ErrorBoundaryProps,
  FallbackProps,
} from "react-error-boundary";
import { Button, Result, Space } from "antd";
import React from "react";

// export function setWithExpiry(key, value, ttl) {
//   const item = {
//     value: value,
//     expiry: new Date().getTime() + ttl
//   };
//   localStorage.setItem(key, JSON.stringify(item));
// }

// export function getWithExpiry(key) {
//   const itemString = window.localStorage.getItem(key);
//   if (!itemString) return null;

//   const item = JSON.parse(itemString);
//   const isExpired = new Date().getTime() > item.expiry;

//   if (isExpired) {
//     localStorage.removeItem(key);
//     return null;
//   }

//   return item.value;
// }

export const logError = (error: Error, info: { componentStack: string }) => {
  // Do something with the error, e.g. log to an external API
  console.log("error log", error, info);
};

export function fallbackRender({ error, resetErrorBoundary }: FallbackProps) {
  // const navigate = useNavigate();

  // Call resetErrorBoundary() to reset the error boundary and retry the render.
  // console.log('log', error)

  // console.log("error instanceof HttpError", error instanceof HttpError);
  if (error.name === "ApiError") {
    if (error.status === 500) {
      return (
        <Result
          status="500"
          title="服务异常，请联系管理员！"
          extra={
            <Space>
              <Button onClick={resetErrorBoundary}>重试</Button>
            </Space>
          }
        />
      );
    }
    if (error.status === 401) {
      return (
        <Result
          status="403"
          title="登录超时，请重新登录"
          extra={
            <Space>
              <Button
                type="primary"
                key="console"
                onClick={() => {
                  // navigate("/login", { replace: true })
                  window.location.href = "/login";
                }}
              >
                前往登录
              </Button>
            </Space>
          }
        />
      );
    }
  }

  // useEffect(() => {
  //   const chunkFailedMessage = /Loading chunk [\d]+ failed/;
  //   if (error?.message && chunkFailedMessage.test(error.message)) {
  //     if (!getWithExpiry("chunk_failed")) {
  //       setWithExpiry("chunk_failed", "true", 10000);
  //       window.location.reload();
  //     }
  //   }
  // }, [error]);

  return (
    <Result
      status="error"
      title={error.message}
      extra={
        <Space>
          <Button onClick={resetErrorBoundary}>重试</Button>
        </Space>
      }
    />
  );
  // return (
  //   <div role="alert">
  //     <p>Something went wrong22:</p>
  //     <pre style={{ color: "red" }}>{error.message}</pre>
  //   </div>
  // );
}

export default ({
  FallbackComponent = fallbackRender,
  onError = logError,
  children,
}: React.PropsWithChildren<ErrorBoundaryProps>) => {
  return (
    <ErrorBoundary
      // fallbackRender={<div>123</div>}
      FallbackComponent={FallbackComponent}
      onError={onError}
    >
      {children}
    </ErrorBoundary>
  );
};
