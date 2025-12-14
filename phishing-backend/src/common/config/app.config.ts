import {registerAs} from '@nestjs/config';
import * as process from "node:process";
import {IAppConfig} from "../interfaces/config/app-config.interface";

export default registerAs('app', (): IAppConfig => {
    const {
        DATABASE_URL,
        EMAIL_USER,
        EMAIL_PASS,
    } = process.env;

    if (!DATABASE_URL) {
        throw new Error('Missing required environment variable: DATABASE_URL');
    }

    return {
        url: process.env.APP_URL || 'http://localhost:8788',
        port: parseInt(process.env.PORT || '8788', 10),
        databaseUri: DATABASE_URL,
        mailUser: EMAIL_USER,
        mailPassKey: EMAIL_PASS,
    };
});

