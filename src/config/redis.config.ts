import { createClient, type RedisClientType } from 'redis';

let redisClient: RedisClientType = createClient();

redisClient.connect().then(() => {
    console.log(`Redis connected successfully`);
});

export default redisClient