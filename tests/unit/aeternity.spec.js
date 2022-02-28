import { aeInitClient, aeInitWallet } from '@/utils/aeternity'

describe('Aeternity', () => {
  it('Can init static client', async () => {
    const isConnected = await aeInitClient()

    expect(isConnected).toEqual(true)
  })

  it('Can init wallet', async () => {
    const isConnected = await aeInitWallet()

    expect(isConnected).toEqual(true)
  })
})
