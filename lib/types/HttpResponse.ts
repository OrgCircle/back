export type HttpResponse<T> = Promise<{ code: number; data: T } | HttpError>;

type HttpError = { code: number; message: string };
