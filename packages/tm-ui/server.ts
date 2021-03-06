import express from 'express';
import {
  readTemplate,
  resolveTemplate,
  saveTemplate,
  registerTemplate,
  unregisterTemplate,
} from '@tm-tools/tm-shared';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();

app.use(bodyParser.json());
app.get('/api/templates', (req, res) => {
  res.send(readTemplate());
});

app.post('/api/templates', (req, res) => {
  registerTemplate(req.body.name, req.body.url, req.body.type);
  res.send({
    name: req.body.name,
    url: req.body.url,
    type: req.body.type,
  });
});

app.get('/api/templates/:template', (req, res) => {
  const templateMap = readTemplate();
  res.send(templateMap[req.params.template]);
});

app.delete('/api/templates/:template', (req, res) => {
  unregisterTemplate(req.params.template);
  res.status(200).send();
});

app.post('/api/templates/:template', (req, res) => {
  resolveTemplate(req.params.template, req.body.projectName);
  res.status(200).send();
});

app.use('/', express.static(path.resolve(__dirname, '../build')));

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

// app.listen(3000, () => {
//   console.log('Listening on http://localhost:3000');
// });

export default app;
