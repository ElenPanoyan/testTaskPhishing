import {registerAs} from '@nestjs/config';
import * as process from "node:process";
import {IAppConfig} from "../interfaces/config/app-config.interface";

export default registerAs('app', (): IAppConfig => {
    const {
        JWT_USER_SECRET,
        JWT_USER_TOKEN_EXPIRES_IN,
        DATABASE_URL,
    } = process.env;

    if (!JWT_USER_SECRET || !DATABASE_URL) {
        throw new Error('Missing required environment variables: JWT_USER_SECRET and DATABASE_URL');
    }

    return {
        userSecret: JWT_USER_SECRET,
        userExpiresIn: JWT_USER_TOKEN_EXPIRES_IN || '1d',
        port: parseInt(process.env.PORT || '8787', 10),
        databaseUri: DATABASE_URL,
        phishingServerUrl: process.env.PHISHING_SERVER_URL || 'http://phishing-backend:8788',
    };
});

