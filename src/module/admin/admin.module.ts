import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';
import { OperationLog } from 'src/model/entity/opt_log.entity';
import User from 'src/model/entity/User.entity';
import { OperationLogService } from 'src/service/opt_log.service';
import { UserService } from 'src/module/admin/user/user.service';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { MenuService } from './rbac/menu.service';
import { MenuController } from './rbac/menu.controller';
import { Menu } from 'src/model/entity/menu.entity';
import { Role } from 'src/model/entity/role.entity';
import { RoleService } from './rbac/role.service';
import { RoleController } from './rbac/role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, OperationLog, Menu, Role])],
  providers: [
    UserService,
    OperationLogService,
    MenuService,
    RoleService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController, UserController, MenuController, RoleController],
  exports: [OperationLogService],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('admin');
  }
}
