import express from 'express';

const app = express();
const PORT = 8880;

app.get('/', (request, response) => {
    response.send(`I'm a live!...`);
})

app.listen(PORT, () => console.log(`App was started on port: ${PORT}`));
