<template>
  <div class="wallet">
    <template v-if="walletStatus">
      <strong>Wallet Status :: </strong> {{ walletStatus }}
      <br/>
    </template>

    <template v-if="address && walletStatus === 'connected'">
      <template v-if="activeWallet">
        <strong>Provider :: </strong> {{ activeWallet.info.name }}
        <br/>
      </template>
      <strong>Network ID :: </strong> {{ networkId }}
        <br/>
      <strong>Address :: </strong> {{ address }}
      <br/>
      <strong>Balance :: </strong> {{ balance }} AE
    </template>

    <img
      v-else
      src="../assets/loading_logo.svg"
      style="width: 50px"
    />
  </div>
</template>

<script setup>
import { toRefs } from 'vue'
import { aeWallet } from '../utils/aeternity'

// probably needs deps upgrading deps
// eslint-disable-next-line
const { address, balance, walletStatus, activeWallet, networkId } = toRefs(aeWallet)
</script>

<style scoped>
.wallet {
  margin: 0 auto;
  max-width: 600px;

  border: 2px solid #de3f6b;
  border-radius: 15px;
  padding: 20px;
  text-align: left;
}

.wallet strong {
  color: #de3f6b;
}
</style>
