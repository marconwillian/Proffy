import express from 'express';

const app = express();

let port = process.env.PORT || 30030;

app.use(express.json())

app.post('/', (req, res)=> {
    
    res.status(200).json(req.body);
})

app.listen(port, () => {
    console.log(`Listen on por ${port}`)
})