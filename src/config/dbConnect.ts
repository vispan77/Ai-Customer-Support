import mongoose, { Connection } from "mongoose";

declare global {
    var mongoose: {
        conn: Connection | null;
        promise: Promise<Connection> | null;
    };
}

const MONGODB_URL = process.env.NEXT_PUBLIC_MONGODB_URL;

if (!MONGODB_URL) {
    throw new Error("NEXT_PUBLIC_MONGODB_URL is not defined in environment variables");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URL).then((c) => c.connection)
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        console.error("Database connection failed:", error);
        throw error;
    }

    return cached.conn;
};

export default dbConnect;
