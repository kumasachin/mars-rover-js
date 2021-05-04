import { delay } from './common-utils';

describe('delay util testing', () => {
  it('should delay excution before next line', async () => {
    const response = await delay(10);
    expect(response).toBe(2);
  });
  it('should delay excution before next line', async () => {
    jest.useFakeTimers();
    delay(0);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 0);
  });
});
