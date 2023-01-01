import { Test, TestingModule } from '@nestjs/testing';
import {
  ExecutionContext,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { BullQueueModule } from 'src/bull-queue/bull-queue.module';
import { JwtStrategy } from 'src/v1/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from 'src/v1/guards/jwt.guard';
import { ScheduleModule } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { BocalsModule } from 'src/v1/bocals/bocals.module';
import { GetDataRoomDto } from 'src/v1/bocals/dto/bocals/get-data-room.dto';
import { Reports } from 'src/v1/entities/reports.entity';

describe('BocalsController (e2e)', () => {
  let app: INestApplication;
  let reportsRepo: Repository<Reports>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        BullQueueModule,
        ScheduleModule.forRoot(),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: parseInt(process.env.POSTGRES_PORT, 10),
          username: process.env.POSTGRES_USERNAME,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DATABASE,
          entities: [__dirname + '/../src/v1/entities/*.entity.ts'],
          logging: false,
          synchronize: false,
          namingStrategy: new SnakeNamingStrategy(),
        }),
        JwtModule.registerAsync({
          useFactory: () => {
            return {
              secret: process.env.JWT_SECRET,
              signOptions: { expiresIn: process.env.JWT_EXPIRE },
            };
          },
        }),
        BocalsModule,
      ],
      providers: [JwtStrategy],
    })
      .overrideGuard(JwtGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = { intraId: 'nakkim', role: 'bocal' };
          return true;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    reportsRepo = moduleFixture.get<Repository<Reports>>('ReportsRepository');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();
  });

  it('POST /data-room/excel', async () => {
    const reports = await reportsRepo.find();
    return request(app.getHttpServer())
      .post('/data-room/excel')
      .send({ reportIds: reports[0].id })
      .expect(201);
  });

  it('GET /data-room', () => {
    const body: Partial<GetDataRoomDto> = {
      take: 10,
      page: 1,
    };
    return request(app.getHttpServer())
      .get(`/data-room?take=${body.take}&page=${body.page}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
