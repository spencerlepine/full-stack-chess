import express from 'express';
import routes from './routes/index.js';

const app = express();
const port = process.env.PORT || 3000;

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  console.log('ERROR:', err);
  res.render('error', { error: err })
}

app.use(express.static('public'));
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});
