// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import { App } from './App.tsx';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url'

// 메모리 캐시 저장소
const cache: { [key: string]: string } = {};
const app = express();
const port = 3333;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 정적 파일 제공 (SSG)
const staticFilePath = path.resolve(__dirname, 'static');
app.use(express.static(staticFilePath));

// 캐시 미들웨어
const cacheMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const cachedContent = cache[req.url];
  if (cachedContent) {
    // 캐시에 있는 결과가 있다면 바로 전송
    console.log(`Serving from cache: ${req.url}`);
    res.send(cachedContent);
  } else {
    next();
  }
};

// SSR + 캐싱 + 스트리밍 처리
app.get('*', cacheMiddleware, (req, res) => {
  // 특정 경로는 SSG 파일 제공 (예: "/about" 페이지는 정적으로 생성됨)
  if (req.url === '/about') {
    const staticFile = path.join(staticFilePath, 'about.html');
    if (fs.existsSync(staticFile)) {
      console.log(`Serving static file for: ${req.url}`);
      return res.sendFile(staticFile);
    }
  }

  // 스트리밍 SSR 적용
  res.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Simple SSR</title>
    </head>
    <body>
      <div id="root">
  `);

  const stream = ReactDOMServer.renderToNodeStream(<App url={req.url} />);

  stream.pipe(res, { end: false });

  stream.on('end', () => {
    res.write(`
      </div>
    </body>
    </html>
    `);
    res.end();
    
    // 캐시에 결과 저장
    cache[req.url] = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Simple SSR</title>
    </head>
    <body>
      <div id="root">${ReactDOMServer.renderToString(<App url={req.url} />)}</div>
    </body>
    </html>
    `;
    console.log(`Cached: ${req.url}`);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
