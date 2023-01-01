import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import { AvailableTimeDto } from '../available-time.dto';

export class UpdateMentorDatailDto {
  @IsOptional()
  @Type(() => AvailableTimeDto)
  @Transform(data => JSON.parse(JSON.stringify(data.value)))
  @ApiPropertyOptional({
    description: '멘토링 가능 시간',
    required: false,
    type: [[AvailableTimeDto]],
    example: [
      [],
      [
        { startHour: 6, startMinute: 0, endHour: 10, endMinute: 0 },
        { startHour: 10, startMinute: 0, endHour: 11, endMinute: 0 },
      ],
      [],
      [],
      [{ startHour: 6, startMinute: 30, endHour: 9, endMinute: 0 }],
      [],
      [{ startHour: 6, startMinute: 30, endHour: 9, endMinute: 0 }],
    ],
  })
  availableTime?: AvailableTimeDto[][];

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'name',
    required: false,
    example: '김나경',
  })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'introduction',
    required: false,
    example: '안녕하세요. 테스트 테스트 예시 데이터',
  })
  introduction?: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'isActive',
    required: false,
    type: Boolean,
  })
  isActive?: boolean;

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({
    description: '멘토 태그',
    required: false,
    type: Array,
    isArray: true,
  })
  tags?: string[];

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'markdownContent',
    required: false,
    example: '<h1>hi</h1>',
  })
  markdownContent?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'slackId',
    required: false,
    type: String,
    example: 'nakkim',
  })
  slackId?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'company',
    required: false,
    type: String,
    example: '야후꾸러기',
  })
  company?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'duty',
    required: false,
    type: String,
    example: 'CTO',
  })
  duty?: string;
}
