import {
  AeSdkAepp,
  Node,
  BrowserWindowMessageConnection,
  AE_AMOUNT_FORMATS,
  AeSdk,
  walletDetector,
  MemoryAccount,
} from '@aeternity/aepp-sdk'

import { reactive, toRefs } from 'vue'
import { COMPILER_URL, NETWORKS } from './configs'

export let sdk = null

export const aeWallet = reactive({
  activeWallet: null,
  address: null,
  balance: null,
  walletStatus: null,
  isStatic: false,
})

export const aeInitWallet = async () => {
  const { walletStatus } = toRefs(aeWallet)

  const nodes = []

  for (const { type, url } of NETWORKS) {
    nodes.push({
      name: type,
      instance: new Node(url),
    })
  }

  walletStatus.value = 'connecting'

  try {
    const { VUE_APP_WALLET_SECRET_KEY, VUE_APP_WALLET_PUBLIC_KEY } = process.env
    // connect to static Wallet
    if (VUE_APP_WALLET_SECRET_KEY && VUE_APP_WALLET_PUBLIC_KEY) {
      const account = new MemoryAccount({
        keypair: { secretKey: VUE_APP_WALLET_SECRET_KEY, publicKey: VUE_APP_WALLET_PUBLIC_KEY },
      })

      const client = new AeSdk({
        compilerUrl: COMPILER_URL,
        nodes,
        accounts: [account],
      })
      sdk = client

      walletStatus.value = 'connected'
      await aeFetchWalletInfo(client)
    } else {
      // connect to Superhero Wallet
      sdk = new AeSdkAepp({
        name: 'AEPP',
        nodes,
        compilerUrl: COMPILER_URL,
        onNetworkChange (params) {
          this.selectNode(params.networkId)
          aeFetchWalletInfo()
        },
        onAddressChange (addresses) {
          console.info('onAddressChange :: ', addresses)
          aeFetchWalletInfo()
        },
      })
      walletStatus.value = 'connected'
      await aeScanForWallets()
    }
  } catch (error) {
    console.info('aeInitWallet . error: ', error)
    return false
  }
  return true
}

export const aeScanForWallets = async () => {
  const { walletStatus, activeWallet } = toRefs(aeWallet)

  walletStatus.value = 'scanning'

  return new Promise((resolve) => {
    const handleWallets = async ({ wallets, newWallet }) => {
      newWallet = newWallet || Object.values(wallets)[0]
      stopScan()
      if (!sdk) return

      activeWallet.value = newWallet
      const { networkId } = await sdk.connectToWallet(newWallet.getConnection())
      sdk.selectNode(networkId)
      await sdk.subscribeAddress('subscribe', 'current')

      await aeFetchWalletInfo()

      resolve()
    }
    const scannerConnection = new BrowserWindowMessageConnection()
    const stopScan = walletDetector(scannerConnection, handleWallets)
  })
}

export const aeFetchWalletInfo = async () => {
  const { address, balance, walletStatus } = toRefs(aeWallet)

  walletStatus.value = 'fetching_info'

  try {
    address.value = await sdk.address()

    balance.value = await sdk.getBalance(address.value, {
      format: AE_AMOUNT_FORMATS.AE,
    })

    walletStatus.value = null
    return true
  } catch (error) {
    walletStatus.value = 'fetching_failed'
    console.info('aeFetchWalletInfo error::', error)
    return false
  }
}
