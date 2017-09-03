import { JobAppPage } from './app.po';

describe('job-app App', () => {
  let page: JobAppPage;

  beforeEach(() => {
    page = new JobAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
