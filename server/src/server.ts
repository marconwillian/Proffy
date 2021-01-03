import express from 'express';
import cors from 'cors';

import routes from './routes';
import Sentry from './config/sentry';

const app = express();

let port = process.env.PORT || 3000;

app.use(express.json())
app.use(cors())
app.use(routes)

app.use((request, response) => {
  const transaction = Sentry.startTransaction(
      {
          op: "not_find",
          name: "Route not found",
          data: {
              path: request.path
          },
      }
  );

  try {
      return response.status(404).json({error: "Sorry can't find that!"})
  } catch (error) {
      Sentry.captureException(error);
      return response.status(400).json({error: true, message: error});
  } finally {
      transaction.finish();
  }
})

app.listen(port, () => {
  console.log(`Listen on por ${port}`)
})