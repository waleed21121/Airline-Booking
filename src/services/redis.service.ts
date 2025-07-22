import { redisClient } from "../config";

async function setJson<T> (key: string, data: T) {
    const json = JSON.stringify(data);
    await redisClient.set(key, json);
}

async function getJson<T> (key: string): Promise<T | null> {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data): null;
}

async function deleteKeys (key: string) {
    const keys = await redisClient.keys(key);
    keys.forEach(async (ele) => {
        await redisClient.del(ele);
    })
}

const RedisService = {
    setJson,
    getJson,
    deleteKeys
}

export default RedisService;