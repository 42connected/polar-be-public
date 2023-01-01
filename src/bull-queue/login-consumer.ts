import { Process, Processor } from '@nestjs/bull';
import { ConflictException } from '@nestjs/common';
import { Job } from 'bull';
import fetch from 'node-fetch';
import { LoginJob } from '../v1/interface/login-job.interface';

@Processor('login-queue')
export class LoginConsumer {
  @Process('get-profile')
  async login(job: Job<LoginJob>, done) {
    const { accessToken, url } = job.data;
    let res;
    try {
      res = await fetch(url, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (err) {
      throw new ConflictException(err, 'fetch 작업 중 에러가 발생했습니다.');
    }
    if (res.status !== 200) {
      throw new ConflictException('프로필 정보를 받아올 수 없습니다.');
    }
    try {
      const profile = await res.json();
      done(null, profile);
    } catch (err) {
      throw new ConflictException(
        err,
        '응답에서 데이터를 얻어 오는 중 에러가 발생했습니다.',
      );
    }
  }
}
