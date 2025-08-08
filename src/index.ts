import express from 'express';
import { proxyServer } from './proxyServer';
const app = express();

export const startServer = (port: number, origin: string) => {
  app.use(proxyServer(origin));

  app.listen(port, (err) => {
    if (err instanceof Error) {
      console.error(err.message);
      process.exit(1);
    }
    console.log(`server started at port: ${port}`);
    console.log(`Forwarding requests to: ${origin}`);
  });
};
