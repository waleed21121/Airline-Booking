import express from 'express';
import  { envVariables, Logger } from './config';
import apiRrouter from './routes';

const app = express();

app.use('/api', apiRrouter);



app.listen(envVariables.PORT, () => {
    console.log('Lestining on port : ' + envVariables.PORT);
    Logger.info("Successfully started the server", "root", {});
})