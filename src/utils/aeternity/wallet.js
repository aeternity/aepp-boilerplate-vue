import {
  AeSdkAepp,
  Node,
  BrowserWindowMessageConnection,
  AE_AMOUNT_FORMATS,
  AeSdk,
  walletDetector,
  MemoryAccount,
} from '@aeternity/aepp-sdk'

import { reactive, toRefs, shallowReactive } from 'vue'

export const state = reactive({
  walletInfo: null,
  aeSdk: null,
  address: null,
  balance: null,
  status: 'connecting',
  networkId: process.env.VUE_APP_NETWORK_ID,
})

export const initWallet = async () => {
  const { status, aeSdk } = toRefs(state)

  try {
    const aeSdkOptions = {
      nodes: [{
        name: process.env.VUE_APP_NETWORK_ID,
        instance: new Node(process.env.VUE_APP_NODE_URL),
      }],
      compilerUrl: process.env.COMPILER_URL,
    }

    const { VUE_APP_WALLET_SECRET_KEY, VUE_APP_WALLET_PUBLIC_KEY } = process.env
    // connect to static Wallet
    if (VUE_APP_WALLET_SECRET_KEY && VUE_APP_WALLET_PUBLIC_KEY) {
      const account = new MemoryAccount({
        keypair: { secretKey: VUE_APP_WALLET_SECRET_KEY, publicKey: VUE_APP_WALLET_PUBLIC_KEY },
      })

      // AeSdk instance can't be in deep reactive https://stackoverflow.com/a/69010240
      aeSdk.value = shallowReactive(new AeSdk(aeSdkOptions))
      
      await aeSdk.value.addAccount(account, { select: true })

      await fetchAccountInfo()
    } else {
      // connect to Superhero Wallet
      // AeSdkAepp instance can't be in deep reactive https://stackoverflow.com/a/69010240
      aeSdk.value = shallowReactive(new AeSdkAepp({
        name: 'AEPP',
        ...aeSdkOptions,
        async onNetworkChange({ networkId }) {
          await connectToNode(networkId)
        },
        async onAddressChange(addresses) {
          console.info('onAddressChange ::', addresses)
          await fetchAccountInfo()
        },
      }))
      await scanForWallets()
    }
  } catch (error) {
    status.value = 'failed';
    throw error;
  }
}

const scanForWallets = async () => {
  const { status, walletInfo, aeSdk } = toRefs(state)
  status.value = 'scanning'

  const foundWallet = await new Promise((resolve) => {
    const handleWallets = async ({ newWallet }) => {
      stopScan()
      resolve(newWallet)
    }
    const scannerConnection = new BrowserWindowMessageConnection()
    const stopScan = walletDetector(scannerConnection, handleWallets)
  });

  walletInfo.value = await aeSdk.value.connectToWallet(foundWallet.getConnection())
  await aeSdk.value.subscribeAddress('subscribe', 'current')
  await connectToNode(walletInfo.value.networkId)
}

const fetchAccountInfo = async () => {
  const { address, balance, status } = toRefs(state)
  status.value = 'fetching_info'
  address.value = await state.aeSdk.address()
  balance.value = await state.aeSdk.getBalance(address.value, {
    format: AE_AMOUNT_FORMATS.AE,
  })
  state.status = 'connected'
}

const connectToNode = async (selectedNetworkId) => {
  const { networkId, status, aeSdk } = toRefs(state)
  if (selectedNetworkId !== process.env.VUE_APP_NETWORK_ID) {
    status.value = `failed: Connected to wrong network. Please switch to ${process.env.VUE_APP_NETWORK_NAME} in your wallet.`
    return
  }
  networkId.value = selectedNetworkId
  aeSdk.value.selectNode(selectedNetworkId)
  await fetchAccountInfo()
}
