import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { UserMapper } from '../user/user.mapper';
import { KafkaModule } from '../../common/kafka/kafka.module';
import { environment } from '../../environments';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        KafkaModule.register({
            clientId: 'auth-client',
            brokers: [ environment.broker.url],
            groupId: environment.broker.groupId
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
            secret: '46dc-8f65-5a841a634196',
            signOptions: { expiresIn: '2w' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, UserMapper]
})
export class AuthModule {
}
