import { initWallet } from '@/utils/aeternity/wallet'

describe('Aeternity', () => {
  it('Can init wallet', async () => {
    const isConnected = await initWallet()

    expect(isConnected).toEqual(true)
  })
})
