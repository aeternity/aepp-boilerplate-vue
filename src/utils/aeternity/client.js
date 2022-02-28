import { Node, Universal } from '@aeternity/aepp-sdk'
import { reactive, toRefs } from 'vue'
import { COMPILER_URL, NETWORKS } from './configs'
import identity from './contracts/Idenitity.aes'

export const aeClient = reactive({
  sdk: null,
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
  const { sdk, isConnected, isConnecting, isStatic } = toRefs(aeClient)

  isConnecting.value = true

  const nodes = []

  for (const { name, url } of NETWORKS) {
    nodes.push({
      name,
      instance: await Node({ url })
    })
  }

  sdk.value = await Universal({
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
  const { sdk, networkId, contract, contractAddress } = toRefs(aeClient)
  try {
    networkId.value = (await sdk.value.getNodeInfo()).nodeNetworkId

    if (contractAddress.value) {
      contract.value = await sdk.value.getContractInstance(identity, {
        contractAddress: contractAddress.value
      })
    }

    return true
  } catch (error) {
    return false
  }
}
