import mongoose, { Connection } from 'mongoose'

interface mongooseCacheInterface {
    conn?: any;
    promise?: Promise<typeof mongoose>;
}

const mongooseCache: mongooseCacheInterface = {
    conn: undefined,
    promise: undefined
}

const mongodb_uri = process.env.MONGODB_URI

export const fetchMongooseConnection = async () => {
    if(mongooseCache.conn) return mongooseCache.conn

    if(!mongodb_uri) throw new Error('MongoDB connection url not specified')

    mongooseCache.promise = mongooseCache.promise || mongoose.connect(mongodb_uri, {
        dbName: 'Test',
        bufferCommands: false
    })

    mongooseCache.conn = await mongooseCache.promise;

    return mongooseCache.conn
}