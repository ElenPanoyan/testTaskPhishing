import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {MongooseModule} from "@nestjs/mongoose";
import {PhishingModule} from "./modules/phishing/phishing.module";
import appConfig from "./common/config/app.config";

@Module({
    imports: [
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
    providers: [],
})
export class AppModule {
}

