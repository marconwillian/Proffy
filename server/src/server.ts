import express from 'express';
import cors from 'cors';

import routes from './routes';

const app = express();

let port = process.env.PORT || 3000;

app.use(express.json())
app.use(cors())
app.use(routes)

app.listen(port, () => {
  console.log(`Listen on por ${port}`)
})