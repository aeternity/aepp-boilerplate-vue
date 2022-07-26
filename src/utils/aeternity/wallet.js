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
import { COMPILER_URL } from './configs'

export let sdk = null

export const aeWallet = reactive({
  activeWallet: null,
  address: null,
  balance: null,
  walletStatus: null,
  isStatic: false,
  networkId: null,
})

export const aeInitWallet = async () => {
  const { walletStatus } = toRefs(aeWallet)

  const nodes = [{
    name: process.env.VUE_APP_TYPE,
    instance: new Node(process.env.VUE_APP_URL),
  }]

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
        onNetworkChange: async ({ networkId }) => {
          await aeConnectToNode(networkId)
        },
        onAddressChange: async (addresses) => {
          console.info('onAddressChange :: ', addresses)
          await aeFetchWalletInfo()
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
      await sdk.subscribeAddress('subscribe', 'current')

      await aeConnectToNode(networkId)


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
    walletStatus.value = 'connected'
    return true
  } catch (error) {
    walletStatus.value = 'fetching_failed'
    console.info('aeFetchWalletInfo error::', error)
    return false
  }
}

export const aeConnectToNode = async (selectedNetworkId) => {
  const { networkId, walletStatus } = toRefs(aeWallet)
  const defaultNetworkId = process.env.VUE_APP_TYPE
  if (selectedNetworkId === defaultNetworkId) {
    networkId.value = selectedNetworkId
    sdk.selectNode(selectedNetworkId)
    await aeFetchWalletInfo()
  } else {
    walletStatus.value = `Connected to wrong network. Please switch to ${process.env.VUE_APP_NAME} in your wallet.`
    networkId.value = defaultNetworkId
    sdk.selectNode(defaultNetworkId)
  }
}

