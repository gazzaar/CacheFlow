import { RequestHandler } from 'express';

export interface ResponseData {
  body: unknown;
  status: number;
  headers: Record<string, string>;
}

type WithError<T> = T & { error: string };

export type ExpressHandler<req, res> = RequestHandler<
  string,
  Partial<WithError<res>>,
  Partial<req>
>;

export interface ProxyRequest {
  url: string;
}

export type ProxyResponse = Pick<ResponseData, 'body'>;
