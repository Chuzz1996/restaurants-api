import * as process from "process";

export default () => {
    return {
        MONGO_DB_URL: process.env.MONGO_RESTAURANT_DB,
        PORT: process.env.PORT
    }
}