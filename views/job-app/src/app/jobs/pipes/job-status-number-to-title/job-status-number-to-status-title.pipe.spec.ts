import { JobStatusNumberToTitlePipe } from './job-status-number-to-status-title.pipe';

describe('JobStatusNumberToStatusTitlePipe', () => {
  it('create an instance', () => {
    const pipe = new JobStatusNumberToTitlePipe();
    expect(pipe).toBeTruthy();
  });
});
