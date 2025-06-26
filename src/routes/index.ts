import { Router } from 'express';
import v1Router from './v1';

const apiRrouter = Router();

apiRrouter.use('/v1', v1Router);

export default apiRrouter