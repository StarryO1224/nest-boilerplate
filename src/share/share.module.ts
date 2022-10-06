import { HttpModule } from '@nestjs/axios'
import { CacheModule, Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { RedisModule } from './redis/redis.module'
import { RedisService } from './service/redis.service'

// share service providers
const providers = [RedisService]

@Global()
@Module({
  imports: [
    // axios http
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    // redis cache
    CacheModule.register(),
    // redis
    RedisModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        host: config.get<string>('redis.host'),
        port: config.get<number>('redis.port'),
        password: config.get<string>('redis.password'),
        db: config.get<number>('redis.db'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [...providers],
  exports: [HttpModule, CacheModule, ...providers],
})
export class ShareModule {}
