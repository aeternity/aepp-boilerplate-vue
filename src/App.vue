<template>
  <div id="container">
    <img alt="Aeternity" src="./assets/logo.svg" style="width: 250px"/>
    <h1>Welcome To Aeternity</h1>
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <button @click="init()">Init Manually</button>
  </div>

  <router-view/>
</template>

<script>
import { defineComponent, } from 'vue'
import { initWallet } from './utils/aeternity/wallet'

export default defineComponent({
  name: 'App',
  setup() {
    async function init() {
      await initWallet()
    }

    return {
      init
    }
  }
})
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#container {
  padding-top: 30px;
}
#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #de3f6b;
}
</style>
