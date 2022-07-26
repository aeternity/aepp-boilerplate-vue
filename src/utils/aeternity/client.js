import { Node, AeSdk } from '@aeternity/aepp-sdk'
import { reactive, toRefs } from 'vue'
import { COMPILER_URL } from './configs'
import identity from './contracts/Idenitity.aes'

export let sdk = null

export const aeClient = reactive({
  isConnecting: false,
  isConnected: false,
  isStatic: false,
  networkId: null,

  contract: null,
  contractAddress: null
})

/**
 * Initialize a static client, mainnet or testnet
 * This client can not sign transactions that require funds (everything except static contract calls)
 * @returns {Promise<boolean>}
 */
export const aeInitClient = async () => {
  const { isConnected, isConnecting, isStatic } = toRefs(aeClient)

  isConnecting.value = true

  const nodes = [{
    name: process.env.VUE_APP_TYPE,
    instance: new Node(process.env.VUE_APP_URL),
  }]

  sdk = new AeSdk({
    nodes: nodes,
    compilerUrl: COMPILER_URL
  })

  isStatic.value = true
  isConnected.value = true
  isConnecting.value = false

  return await aeInitProvider()
}

/**
 * After finding a wallet this function is called to cache
 * basic values from the wallet.
 * @returns {Promise<boolean>}
 */
export const aeInitProvider = async () => {
  const { networkId, contract, contractAddress } = toRefs(aeClient)
  try {
    networkId.value = (await sdk.getNodeInfo()).nodeNetworkId

    if (contractAddress.value) {
      contract.value = await sdk.getContractInstance(identity, {
        contractAddress: contractAddress.value
      })
    }

    return true
  } catch (error) {
    return false
  }
}
