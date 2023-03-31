<template>
    <div class="contract">
        <h1>Contract Page</h1>

        <div class="details">
          <strong>ACI</strong>
          <pre>{{ toString(multiplier._aci) }}</pre>
          
          <span>
            <strong>Bytecode ::</strong>
            {{ multiplier.$options.bytecode }}
          </span>

          <template v-if="deployResult">
            <strong>Deploy result</strong>
            <pre>{{ toString(deployResult) }}</pre>
          </template>

          <template v-if="callResult">
            <strong>Call result</strong>
            <pre>{{ toString(callResult) }}</pre>
          </template>

          <button
            v-if="!callResult"
            @click="multiplier.$options.address ? contractCall() : contractDeploy()"
          >
            {{ multiplier.$options.address ? 'Call' : 'Deploy' }}
          </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { state } from '../utils/aeternity/wallet'
import Multiplier from '../utils/aeternity/contracts/Multiplier.aes'

const toString = (value) => (
  typeof value === 'string'
    ? value
    : JSON.stringify(value, (k, v) => (typeof v === 'bigint' ? `${v} (as BigInt)` : v), 2)
)

const multiplier = new Multiplier(state.aeSdk._getOptions())
let deployResult = ref()
let callResult = ref()

async function contractDeploy() {
  deployResult.value = 'Deploying...'
  try {
    deployResult.value = await multiplier.$deploy([6])
  } catch (error) {
    deployResult.value = 'Failed'
    throw error
  }
}

async function contractCall() {
  callResult.value = 'Calling...'
  try {
    callResult.value = await multiplier.calc(7)
  } catch (error) {
    callResult.value = 'Failed'
    throw error
  }
}
</script>

<style scoped>
.contract .details {
  margin: 0 auto;
  max-width: 620px;

  border: 2px solid #de3f6b;
  border-radius: 15px;
  padding: 0 20px;
  text-align: left;
  word-break: break-all;
  font-size: 16px;
}

.contract .details > * {
  margin: 20px 0;
}

.contract .details > strong {
  display: block;
}

.contract .details strong {
  color: #de3f6b;
}

.contract .details pre {
  overflow: hidden;
}

.contract .details button {
  display: block;
  border: 2px solid #de3f6b;
  border-radius: 15px;
  background: none;
  font-size: 16px;
  padding: 2px 8px;
}
</style>
