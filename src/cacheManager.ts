import { ResponseData } from './types';
const cache: Map<string, ResponseData> = new Map();

export const writeToCache = (key: string, data: ResponseData): void => {
  cache.set(key, data);
};

export const getFromCache = (key: string): ResponseData | undefined => {
  return cache.get(key);
};

export const clearCache = (): void => {
  cache.clear();
};
