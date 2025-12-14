import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {MongooseModule} from "@nestjs/mongoose";
import {PhishingModule} from "./modules/phishing/phishing.module";
import {AuthModule} from "./modules/auth/auth.module";
import {UserModule} from "./modules/user/user.module";
import appConfig from "./common/config/app.config";
import {JwtAuthGuard} from "./common/gaurds/jwt-auth.guard";

@Module({
    imports: [
        AuthModule,
        UserModule,
        PhishingModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig],
            envFilePath: ['.env']
        }),
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get('app.databaseUri')
            })
        })
    ],
    controllers: [],
    providers: [JwtAuthGuard],
})
export class AppModule {
}

