import express from 'express';

import routes from './routes';

const app = express();

let port = process.env.PORT || 30030;

app.use(express.json())
app.use(routes)

app.listen(port, () => {
    console.log(`Listen on por ${port}`)
})