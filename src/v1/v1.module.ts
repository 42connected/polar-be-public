import { Module } from '@nestjs/common';
import { V1Controller } from './v1.controller';
import { V1Service } from './v1.service';
import { MentorsModule } from './mentors/mentors.module';
import { ReportsModule } from './reports/reports.module';
import { CadetsModule } from './cadets/cadets.module';
import { BocalsModule } from './bocals/bocals.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CommentsModule } from './comments/comments.module';
import { JwtModule } from '@nestjs/jwt';
import { BatchModule } from './batch/batch.module';
import { EmailModule } from './email/email.module';
import { CategoriesModule } from './categories/categories.module';
import { CalendarModule } from './calendar/calendar.module';
import { MentoringLogsModule } from './mentoring-logs/mentoring-logs.module';
import { EmailVerificationModule } from './email-verifications/email-verifications.module';

@Module({
  imports: [
    CategoriesModule,
    MentorsModule,
    ReportsModule,
    CadetsModule,
    BocalsModule,
    AuthModule,
    CommentsModule,
    BatchModule,
    CalendarModule,
    EmailVerificationModule,
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_EXPIRE },
        };
      },
    }),
    EmailModule,
    MentoringLogsModule,
  ],
  controllers: [V1Controller],
  providers: [V1Service, JwtStrategy],
})
export class V1Module {}
