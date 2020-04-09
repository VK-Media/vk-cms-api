import { NextFunction } from 'express'
import * as redis from 'redis'

class RedisClient {
    private redisClient: redis.RedisClient

    constructor() {
        this.redisClient = redis.createClient(6379, 'redis')
    }

    public get = (req: any, res: any, next: NextFunction) => {
        const key = req.route.path

        this.redisClient.get(key, (error, data) => {
            if (error) {
                res.status(400).send(error)
            }

            if (data !== null) {
                res.status(200).send(JSON.parse(data))
            } else {
                next()
            }
        })
    }

    public set = (key: string, value: object, expire: number = 60) => {
        this.redisClient.set(key, JSON.stringify(value), 'EX', expire)
    }

    public clear = (key: string = null) => {
        if (key) {
            this.redisClient.del(key)
        } else {
            this.redisClient.flushdb()
        }
    }
}

export default new RedisClient()
