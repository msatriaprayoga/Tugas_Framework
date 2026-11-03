import { LogMiddlewareMiddleware } from './log-middleware.middleware.js';

describe('LogMiddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(new LogMiddlewareMiddleware()).toBeDefined();
  });
});
