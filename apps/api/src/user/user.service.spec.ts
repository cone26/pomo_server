import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '@libs/dao/common/user/user.repository';
import { ApiServerConfig } from '../config/api.server.config';
import {
  getCustomRepository,
  TypeOrmExModule,
} from '@libs/common/database/typeorm/typeorm-ex.module';
import { commonTypeOrmModuleOptions } from '@libs/common/database/typeorm/typeorm-module.option';
import { UserModule } from '@libs/dao/common/user/user.module';
import { User } from '@libs/dao/common/user/user.entity';
import { UserService } from '../user/user.service';
import { AuthLoginInDto } from '../auth/dto/auth-login-in.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { AuthService } from '../auth/auth.service';

describe('UserService', () => {
  let email: string;
  let password: string;
  let user: User;
  let session: string;
  // let repository: UserRepository;
  let userService: UserService;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ApiServerConfig,
        TypeOrmExModule.forRoot({
          ...commonTypeOrmModuleOptions,
          entities: [User],
        }),

        UserModule,
      ],
      providers: [
        // repository
        UserRepository,

        //service
        UserService,
        AuthService,
        JwtService,

        // provider
        JwtStrategy,
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
    // repository 이걸로 연결하고 싶은데..
    // repository = getCustomRepository(
    //   UserRepository,
    //   process.env.DB_COMMON_NAME,
    // );
    email = 'test@test.com';
    password = 'test';
    await login(email, password);
  });

  // afterAll(async () => {
  //   // delete connect with the user repository
  //   module.get<DataSource>(getDataSourceToken('common')).destroy();
  // });

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [ProfileService],
  //   }).compile();
  //
  //   profileService = module.get<ProfileService>(ProfileService);
  // });

  const login = async (email, password) => {
    const loginDto = new AuthLoginInDto();
    loginDto.email = email;
    loginDto.password = password;
    session = await userService.signIn(loginDto);
    console.log(session);
  };

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
});
