export type HttpResponse<T> = Promise<
  { code: number; data: T | null } | HttpError
>;

type HttpError = { code: number; error: string };
