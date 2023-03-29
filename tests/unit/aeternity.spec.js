import { initWallet } from '@/utils/aeternity/wallet'

describe('Aeternity', () => {
  it('Can init wallet', async () => {
    await expect(initWallet()).resolves.not.toThrowError()
  })
})
