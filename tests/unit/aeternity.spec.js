import { initClient, initWallet } from '@/utils/aeternity'

describe('Aeternity', () => {
  it('Can init static client', async () => {
    const isConnected = await initClient()

    expect(isConnected).toEqual(true)
  })

  it('Can init wallet', async () => {
    const isConnected = await initWallet()

    expect(isConnected).toEqual(true)
  })
})
