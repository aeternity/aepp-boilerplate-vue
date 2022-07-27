<template>
    <div class="home">
        <h1>Home Page</h1>

        <WalletInfo />
    </div>
</template>

<script>
import WalletInfo from '../components/WalletInfo.vue'
export default {
  name: 'HomeView',
  components: { WalletInfo }
}
</script>
