<template>
  <div class="wallet">
    <template v-if="status">
      <strong>Wallet Status :: </strong> {{ status }}
      <br/>
    </template>

    <template v-if="status === 'connected'">
      <template v-if="walletInfo">
        <strong>Provider :: </strong> {{ walletInfo.name }}
        <br/>
      </template>
      <strong>Network ID :: </strong> {{ networkId }}
        <br/>
      <strong>Address :: </strong> <span class="wallet-address">{{ aeSdk.address }}</span>
      <br/>
      <strong>Balance :: </strong> {{ balance }} AE
    </template>

    <img
      v-if="!['connected', 'failed'].includes(status.split(/\W/)[0])"
      src="../assets/loading_logo.svg"
      style="width: 50px"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { state } from '../utils/aeternity/wallet'

export default defineComponent({
  name: 'WalletInfo',
  setup () {
    return state
  }
})
</script>

<style scoped>
.wallet {
  margin: 0 auto;
  max-width: 620px;

  border: 2px solid #de3f6b;
  border-radius: 15px;
  padding: 20px;
  text-align: left;
}

.wallet strong {
  color: #de3f6b;
}
</style>
