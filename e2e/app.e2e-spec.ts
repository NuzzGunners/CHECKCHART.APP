import { CheckchartPage } from './app.po';

describe('checkchart App', function() {
  let page: CheckchartPage;

  beforeEach(() => {
    page = new CheckchartPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
