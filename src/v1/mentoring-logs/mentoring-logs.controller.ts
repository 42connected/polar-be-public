import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { User } from '../decorators/user.decorator';
import { ApproveMentoringDto } from '../dto/mentoring-logs/approve-mentoring.dto';
import { CompleteMentoringDto } from '../dto/mentoring-logs/complete-mentoring.dto';
import { RejectMentoringDto } from '../dto/mentoring-logs/reject-mentoring.dto';
import { EmailService, MailType } from '../email/service/email.service';
import { JwtGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/role.guard';
import { JwtUser } from '../interface/jwt-user.interface';
import {
  MentoringLogsService,
  MentoringLogStatus,
} from './service/mentoring-logs.service';

@ApiTags('mentoring-logs API')
@Controller()
export class MentoringLogsController {
  constructor(
    private mentoringLogsService: MentoringLogsService,
    private emailService: EmailService,
  ) {}

  @Patch('approve')
  @Roles('mentor')
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Approve Mentoring Request API',
    description: '멘토링 요청 수락 API',
  })
  async approveMentoring(
    @User() user: JwtUser,
    @Body() body: ApproveMentoringDto,
  ) {
    const log = await this.mentoringLogsService.changeStatus({
      userId: user.intraId,
      mentoringLogId: body.mentoringLogId,
      status: MentoringLogStatus.Approve,
      meetingAtIndex: body.meetingAtIndex,
    });
    this.emailService.sendMessage(log.id, MailType.Approve);
    return true;
  }

  @Patch('reject')
  @Roles('mentor', 'cadet')
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Reject Mentoring Request API',
    description: '멘토링 요청 거절 API',
  })
  async rejectMentoring(
    @User() user: JwtUser,
    @Body() body: RejectMentoringDto,
  ) {
    const log = await this.mentoringLogsService.changeStatus({
      userId: user.intraId,
      mentoringLogId: body.mentoringLogId,
      status: MentoringLogStatus.Cancel,
      rejectMessage: body.rejectMessage,
    });
    this.emailService.sendMessage(log.id, MailType.Cancel);
    return true;
  }

  @Patch('done')
  @Roles('mentor')
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Mentoring Complete Processing API',
    description: '멘토링 완료 처리 API',
  })
  async CompleteMentoring(
    @User() user: JwtUser,
    @Body() body: CompleteMentoringDto,
  ) {
    return await this.mentoringLogsService.changeStatus({
      userId: user.intraId,
      mentoringLogId: body.mentoringLogId,
      status: MentoringLogStatus.Done,
    });
  }
}
