import * as request from 'supertest';
import Server from "../../server";


beforeAll(() => {
  return Server.init();
});

describe('BookController', () => {
  it('Book Result Test', async () => {
    const response = await request(Server.getApp().app)
      .get('/v1/book')
      .expect(200);

    const result = response.body;

    expect(result.length).toBe(25);
  });
});


afterAll(() => {
  return Server.close();
});
