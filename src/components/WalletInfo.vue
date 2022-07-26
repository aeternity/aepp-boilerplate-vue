<template>
  <div class="wallet">
    <div v-if="walletStatus"><strong>Wallet Status :: </strong> {{ walletStatus }}</div>
    <div v-if="address && !walletStatus" class="wallet-info">
      <div v-if="activeWallet">
        <strong>Provider :: </strong> {{ activeWallet.info.name }}
        <br />
        <strong>Network ID :: </strong> {{ networkId }}
        <br />
      </div>
      <strong>Address :: </strong> <span class="wallet-address">{{ address }}</span>
      <br />
      <strong>Balance :: </strong> <span class="wallet-balance">{{ balance }}</span>
    </div>

    <img
      v-else
      src="../assets/loading_logo.svg"
      style="width: 50px"
    />
  </div>
</template>

<script>
import { defineComponent, toRefs } from 'vue'
import { aeWallet } from '../utils/aeternity'

export default defineComponent({
  name: 'WalletInfo',
  setup () {
    const { address, balance, walletStatus, activeWallet, networkId } = toRefs(aeWallet)

    return { activeWallet, address, balance, walletStatus, networkId }
  }
})
</script>

<style scoped>
.wallet {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0 auto;
    max-width: 600px;

    border: 2px solid #de3f6b;
    border-radius: 15px;
    padding: 20px;
}

.wallet-info {
    text-align: left;
}

.wallet strong {
    color: #de3f6b;
}
</style>
