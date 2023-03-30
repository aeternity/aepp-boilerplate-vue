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

let sdk = null

export const wallet = reactive({
  activeWallet: null,
  address: null,
  balance: null,
  walletStatus: null,
  isStatic: false,
  networkId: null,
})

export const initWallet = async () => {
  const { walletStatus } = toRefs(wallet)

  const nodes = [{
    name: process.env.VUE_APP_NETWORK_ID,
    instance: new Node(process.env.VUE_APP_NODE_URL),
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
        compilerUrl: process.env.COMPILER_URL,
        nodes,
      })

      await client.addAccount(account, {select: true})
      sdk = client

      walletStatus.value = 'connected'
      await fetchAccountInfo()
    } else {
      // connect to Superhero Wallet
      sdk = new AeSdkAepp({
        name: 'AEPP',
        nodes,
        compilerUrl: process.env.COMPILER_URL,
        onNetworkChange: async ({ networkId }) => {
          await connectToNode(networkId)
        },
        onAddressChange: async (addresses) => {
          console.info('onAddressChange :: ', addresses)
          await fetchAccountInfo()
        },
      })
      await scanForWallets()
    }
  } catch (error) {
    walletStatus.value = 'failed';
    throw error;
  }
}

const scanForWallets = async () => {
  const { walletStatus, activeWallet } = toRefs(wallet)

  walletStatus.value = 'scanning'

  return new Promise((resolve) => {
    const handleWallets = async ({ wallets, newWallet }) => {
      newWallet = newWallet || Object.values(wallets)[0]
      stopScan()
      if (!sdk) return

      activeWallet.value = newWallet

      const { networkId } = await sdk.connectToWallet(newWallet.getConnection())
      await sdk.subscribeAddress('subscribe', 'current')

      await connectToNode(networkId)

      resolve()
    }
    const scannerConnection = new BrowserWindowMessageConnection()
    const stopScan = walletDetector(scannerConnection, handleWallets)
  })
}

const fetchAccountInfo = async () => {
  const { address, balance, walletStatus } = toRefs(wallet)

  walletStatus.value = 'fetching_info'

  try {
    address.value = await sdk.address()

    balance.value = await sdk.getBalance(address.value, {
      format: AE_AMOUNT_FORMATS.AE,
    })
    walletStatus.value = 'connected'
    return true
  } catch (error) {
    walletStatus.value = 'fetching failed'
    console.info('fetchAccountInfo error::', error)
    return false
  }
}

const connectToNode = async (selectedNetworkId) => {
  const { networkId, walletStatus } = toRefs(wallet)
  const defaultNetworkId = process.env.VUE_APP_NETWORK_ID
  if (selectedNetworkId === defaultNetworkId) {
    networkId.value = selectedNetworkId
    sdk.selectNode(selectedNetworkId)
    await fetchAccountInfo()
  } else {
    walletStatus.value = `Connected to wrong network. Please switch to ${process.env.VUE_APP_NETWORK_NAME} in your wallet.`
    networkId.value = defaultNetworkId
    sdk.selectNode(defaultNetworkId)
  }
}
