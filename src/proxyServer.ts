import axios from 'axios';
import { writeToCache, getFromCache } from './cacheManager';
import { ExpressHandler, ProxyRequest, ProxyResponse } from './types';

export const proxyServer = (
  origin: string,
): ExpressHandler<ProxyRequest, ProxyResponse> => {
  return async (req, res) => {
    try {
      // is data cached?
      const cachedData = getFromCache(`${origin}${req.url}`);

      if (cachedData) {
        res
          .status(200)
          .set({ ...cachedData.headers, 'X-Cache': 'HIT' })
          .send({ body: cachedData.body });
        return;
      }

      // Forwored the request to the origin
      const response = await axios.get(`${origin}${req.url}`);

      const mapHeaders: Record<string, string> = {};
      for (const [key, value] of Object.entries(response.headers)) {
        if (typeof value === 'string') {
          mapHeaders[key] = value;
        }
      }

      // write to cache
      writeToCache(`${origin}${req.url}`, {
        body: response.data,
        status: response.status,
        headers: mapHeaders,
      });

      res
        .status(200)
        .set({ ...mapHeaders, 'X-Cache': 'MISS' })
        .send(response.data);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).send({ error: err.message });
      }
    }
  };
};
