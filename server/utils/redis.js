import { createClient } from "redis";

if (process.env.NODE_ENV == "production") {
    const client = createClient({
        host: "something",
        port: "whatever",
    });
} else {
    const client = createClient({
        host: "localhost",
        port: 6379,
    });
}
