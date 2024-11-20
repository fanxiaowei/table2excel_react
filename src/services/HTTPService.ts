/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { ApiError, CustomError, isApiErrorResponse } from './ApiError';
import { makeID } from '@/utils';

interface IHTTPHeaders {
    [headerKey: string]: any;
}

interface IQueryPrams {
    [paramName: string]: any;
}

class HTTPService {
    constructor() {
        axios.interceptors.response.use(
            (response) => {
                const { data } = response;
                switch (data.code) {
                    // 处理各种状态
                    default:
                        return response;
                }
            },
            (error) => {
                const config = error.config as AxiosRequestConfig;
                if (error.response) {
                    const response = error.response as AxiosResponse;
                    let apiError: ApiError;
                    // 发出请求后，服务器响应的状态码不在 2xx 范围内
                    if (isApiErrorResponse(response.data)) {
                        const responseData = response.data;
                        apiError = new ApiError(
                            responseData.message,
                            responseData.code,
                            response.status
                        );
                    } else {
                        if (response.status >= 400 && response.status < 500) {
                            apiError = new ApiError(CustomError.CLIENT_ERROR, '', response.status);
                        } else {
                            apiError = new ApiError(CustomError.ServerError, '', response.status);
                        }
                    }
                    throw apiError;
                } else if (error.request) {
                    // 请求已发送，但未收到响应
                    // 在浏览器中，error.request 是 XMLHttpRequest 的一个实例
                    return Promise.reject(error);
                } else {
                    // 设置请求时发生了触发错误的情况
                    return Promise.reject(error);
                }
            }
        );
    }

    /**
     * 附加到所有请求的header信息
     */
    private headers: IHTTPHeaders = {
        'content-type': 'application/json; charset=utf-8',
        'X-Request-ID': makeID(6),
        'Accept-Language': localStorage.getItem('language') || 'zh',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    /**
     * 向header中追加对象
     */
    public setHeaders(headers: IHTTPHeaders) {
        this.headers = {
            ...this.headers,
            ...headers,
        };
    }

    /**
     * 向header中追加值
     */
    public appendHeader(key: string, value: string) {
        this.headers = {
            ...this.headers,
            [key]: value,
        };
    }

    /**
     * 移除给定的header
     */
    public removeHeader(key: string) {
        this.headers[key] = undefined;
    }

    /**
     * 返回 axios 拦截器.
     */
    // eslint-disable-next-line class-methods-use-this
    public getInterceptors() {
        return axios.interceptors;
    }

    /**
     *通用的 HTTP 请求。
     */
    public async request<T>(
        config: AxiosRequestConfig,
        customConfig?: any
    ): Promise<AxiosResponse<T>> {
        try {
            // eslint-disable-next-line no-param-reassign
            config.headers = {
                ...this.headers,
                ...config.headers,
            };
            if (customConfig?.cancel) {
                config.cancelToken = new axios.CancelToken((c) => (customConfig.cancel.exec = c));
            }
            if (customConfig?.noLoading) {
                window.ajaxStatus = 'resolved';
            } else window.ajaxStatus = 'pending';

            const { data } = await axios({ ...config, ...customConfig });
            window.ajaxStatus = 'resolved';
            if (data.code === 0) {
                return data.data;
            }
        } catch (error) {
            window.ajaxStatus = 'resolved';
            throw error;
        }
    }

    public get(url: string, params?: IQueryPrams, headers?: IHTTPHeaders, customConfig?: any) {
        return this.request(
            {
                headers,
                method: 'GET',
                params,
                url,
            },
            customConfig
        );
    }

    public post<T>(
        url: string,
        data?: any,
        params?: IQueryPrams,
        headers?: IHTTPHeaders,
        customConfig?: any
    ) {
        return this.request<T>(
            {
                data,
                headers,
                method: 'POST',
                params,
                url,
            },
            customConfig
        );
    }

    public patch(
        url: string,
        data?: any,
        params?: IQueryPrams,
        headers?: IHTTPHeaders,
        customConfig?: any
    ) {
        return this.request(
            {
                data,
                headers,
                method: 'PATCH',
                params,
                url,
            },
            customConfig
        );
    }

    public put(
        url: string,
        data: any,
        params?: IQueryPrams,
        headers?: IHTTPHeaders,
        customConfig?: any
    ) {
        return this.request(
            {
                data,
                headers,
                method: 'PUT',
                params,
                url,
            },
            customConfig
        );
    }

    public delete(
        url: string,
        data: any,
        params?: IQueryPrams,
        headers?: IHTTPHeaders,
        customConfig?: any
    ) {
        return this.request(
            {
                data,
                headers,
                method: 'DELETE',
                params,
                url,
            },
            customConfig
        );
    }
}

// 创建一个单例
export default new HTTPService();
