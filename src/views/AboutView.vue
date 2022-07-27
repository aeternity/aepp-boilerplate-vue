<template>
    <div class="about">
        <h1>About Page</h1>
        <WalletInfo />
    </div>
</template>

<script>
import WalletInfo from '../components/WalletInfo.vue'
export default {
  name: 'AboutView',
  components: { WalletInfo }
}
</script>
