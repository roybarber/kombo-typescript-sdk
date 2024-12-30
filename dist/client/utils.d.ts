import type { Client, Config, RequestOptions, Security } from './types';
type ArrayStyle = 'form' | 'spaceDelimited' | 'pipeDelimited';
type ObjectStyle = 'form' | 'deepObject';
export type QuerySerializer = (query: Record<string, unknown>) => string;
export type BodySerializer = (body: any) => any;
interface SerializerOptions<T> {
    /**
     * @default true
     */
    explode: boolean;
    style: T;
}
export interface QuerySerializerOptions {
    allowReserved?: boolean;
    array?: SerializerOptions<ArrayStyle>;
    object?: SerializerOptions<ObjectStyle>;
}
export declare const createQuerySerializer: <T = unknown>({ allowReserved, array, object }?: QuerySerializerOptions) => (queryParams: T) => string;
/**
 * Infers parseAs value from provided Content-Type header.
 */
export declare const getParseAs: (contentType: string | null) => Exclude<Config["parseAs"], "auto" | "stream">;
export declare const getAuthToken: (security: Security, options: Pick<RequestOptions, "accessToken" | "apiKey">) => Promise<string | undefined>;
export declare const setAuthParams: ({ security, ...options }: Pick<Required<RequestOptions>, "security"> & Pick<RequestOptions, "accessToken" | "apiKey" | "query"> & {
    headers: Headers;
}) => Promise<void>;
export declare const buildUrl: Client['buildUrl'];
export declare const getUrl: ({ baseUrl, path, query, querySerializer, url: _url }: {
    baseUrl: string;
    path?: Record<string, unknown>;
    query?: Record<string, unknown>;
    querySerializer: QuerySerializer;
    url: string;
}) => string;
export declare const mergeConfigs: (a: Config, b: Config) => Config;
export declare const mergeHeaders: (...headers: Array<Required<Config>["headers"] | undefined>) => Headers;
type ErrInterceptor<Err, Res, Req, Options> = (error: Err, response: Res, request: Req, options: Options) => Err | Promise<Err>;
type ReqInterceptor<Req, Options> = (request: Req, options: Options) => Req | Promise<Req>;
type ResInterceptor<Res, Req, Options> = (response: Res, request: Req, options: Options) => Res | Promise<Res>;
declare class Interceptors<Interceptor> {
    _fns: Interceptor[];
    constructor();
    clear(): void;
    exists(fn: Interceptor): boolean;
    eject(fn: Interceptor): void;
    use(fn: Interceptor): void;
}
export interface Middleware<Req, Res, Err, Options> {
    error: Pick<Interceptors<ErrInterceptor<Err, Res, Req, Options>>, 'eject' | 'use'>;
    request: Pick<Interceptors<ReqInterceptor<Req, Options>>, 'eject' | 'use'>;
    response: Pick<Interceptors<ResInterceptor<Res, Req, Options>>, 'eject' | 'use'>;
}
export declare const createInterceptors: <Req, Res, Err, Options>() => {
    error: Interceptors<ErrInterceptor<Err, Res, Req, Options>>;
    request: Interceptors<ReqInterceptor<Req, Options>>;
    response: Interceptors<ResInterceptor<Res, Req, Options>>;
};
export declare const formDataBodySerializer: {
    bodySerializer: <T extends Record<string, any> | Array<Record<string, any>>>(body: T) => FormData;
};
export declare const jsonBodySerializer: {
    bodySerializer: <T>(body: T) => string;
};
export declare const urlSearchParamsBodySerializer: {
    bodySerializer: <T extends Record<string, any> | Array<Record<string, any>>>(body: T) => URLSearchParams;
};
export declare const createConfig: (override?: Config) => Config;
export {};
//# sourceMappingURL=utils.d.ts.map