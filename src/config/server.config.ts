import { config } from 'dotenv';
import EnvSchema from '../schemas/envVariables';
config();

const envVariables = EnvSchema.parse(process.env);

export default envVariables