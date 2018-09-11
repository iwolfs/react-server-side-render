import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './src/App';

const app = express();

app.get('*', (req, res) => {
  const html = renderToString(<App />);
  fs.readFile(path.resolve(__dirname + '/index.html'), 'utf8', (err, data) => {
    if (err) throw err;

    const documentStr = data.replace(/<div id="root"><\/div>/, ` <div id="root">${html}</div>`);

    res.send(documentStr);
  });
});

app.listen(3000, () => {
  console.log('node listening port 3000!')
})