import express from 'express';
import { envVariables, Logger } from './config';
import apiRrouter from './routes';
import { initDb } from './models';
import { errorHandler } from './middlewares';
import scheduleCron from './utils/common/cronJobs';

const app = express();
app.use(express.json());

app.use('/api', apiRrouter);

// Error middleware
app.use(errorHandler);

initDb().then(() => {
    app.listen(envVariables.PORT, () => {
        console.log('Lestining on port : ' + envVariables.PORT);
        Logger.info("Successfully started the server", "root", {});
        scheduleCron();
    })
})