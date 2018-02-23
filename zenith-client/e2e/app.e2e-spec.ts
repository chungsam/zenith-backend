import { ZenithClientPage } from './app.po';

describe('zenith-client App', () => {
  let page: ZenithClientPage;

  beforeEach(() => {
    page = new ZenithClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
