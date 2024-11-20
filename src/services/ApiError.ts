export interface ApiErrorResponse {
  code: string;
  message: string;
}

export class ApiError extends Error {
  httpStatusCode: number;
  errCode: string;

  constructor(message: string, errCode: string, httpStatus: number) {
    super(message);
    this.name = "ApiError";
    this.errCode = errCode;
    this.httpStatusCode = httpStatus;
  }
}

export function isApiErrorResponse(object: any): object is ApiErrorResponse {
  return object && "code" in object && "message" in object;
}

export const CustomError = {
  CLIENT_ERROR: "客户端错误",
  ServerError: "服务端错误",
};

// 返回了带有上下文信息和原始错误堆栈的新错误对象
export function errorWithContext(originalError: Error, context: string) {
  const errorWithContext = new Error(context);
  errorWithContext.stack =
    errorWithContext.stack?.split("\n").slice(2, 4).join("\n") +
    "\n" +
    originalError.stack;
  return errorWithContext;
}
