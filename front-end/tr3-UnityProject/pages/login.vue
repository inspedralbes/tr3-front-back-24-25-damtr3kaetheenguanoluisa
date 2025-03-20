<template>
  <div class="login-container">
    <div class="game-screen">
      <div class="game-title">
        <div class="bomb-sprite"></div>
        <h1>BOMBERMAN</h1>
        <div class="bomb-sprite"></div>
      </div>
      
      <div class="login-form">
        <h2>LOGIN</h2>
        
        <div class="form-group">
          <label for="email">EMAIL:</label>
          <input 
            type="text" 
            id="email" 
            v-model="email" 
            class="retro-input"
            autocomplete="email"
          />
        </div>
        
        <div class="form-group">
          <label for="password">PASSWORD:</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            class="retro-input"
            autocomplete="current-password"
          />
        </div>
        
        <div class="button-row">
          <button @click="handleLogin" class="retro-button primary-button">
            LOG IN
          </button>
          
          <NuxtLink to="/register" class="retro-button secondary-button">
            REGISTER
          </NuxtLink>
        </div>
      </div>
      
      <div class="block-decoration">
        <div class="brick"></div>
        <div class="solid"></div>
        <div class="brick"></div>
        <div class="solid"></div>
        <div class="brick"></div>
        <div class="solid"></div>
        <div class="brick"></div>
        <div class="solid"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginUser } from '~/services/communicationManager'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')

async function handleLogin() {
  try {
    error.value = ''
    const response = await loginUser(email.value, password.value)
    
    if (response.success) {
      console.log('Login successful')
      await router.push('/menuGame')
    } else {
      error.value = response.message || 'Login failed'
    }
  } catch (e) {
    console.error('Login error:', e)
    error.value = e.message || 'An error occurred during login'
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #000;
  font-family: 'Courier New', monospace;
  padding: 20px;
}

.game-screen {
  background-color: #223;
  border: 8px solid #445;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 255, 0.3);
}

.game-title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.game-title h1 {
  color: #fff;
  font-size: 32px;
  text-align: center;
  text-shadow: 2px 2px 0 #f00, 4px 4px 0 #00f;
  margin: 0 20px;
  letter-spacing: 2px;
}

.bomb-sprite {
  width: 32px;
  height: 32px;
  background-color: #000;
  border-radius: 50%;
  position: relative;
}

.bomb-sprite:before {
  content: '';
  position: absolute;
  width: 8px;
  height: 10px;
  background-color: #888;
  top: -8px;
  left: 12px;
}

.bomb-sprite:after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #f00;
  top: -12px;
  left: 11px;
  box-shadow: 0 0 5px #f00;
}

.login-form {
  background-color: #335;
  padding: 20px;
  border: 4px solid #557;
  margin-bottom: 30px;
}

.login-form h2 {
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  color: #fff;
  margin-bottom: 8px;
  font-weight: bold;
}

.retro-input {
  width: 100%;
  background-color: #111;
  border: 3px solid #557;
  padding: 8px;
  color: #0f0;
  font-family: 'Courier New', monospace;
  font-size: 16px;
}

.retro-input:focus {
  outline: none;
  border-color: #77a;
  box-shadow: 0 0 5px #77a;
}

.button-row {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.retro-button {
  padding: 10px 15px;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  font-size: 16px;
  border: 3px solid #000;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
}

.primary-button {
  background-color: #f00;
  color: #fff;
  border-color: #900;
  width: 48%;
}

.primary-button:hover {
  background-color: #d00;
}

.secondary-button {
  background-color: #00f;
  color: #fff;
  border-color: #009;
  width: 48%;
}

.secondary-button:hover {
  background-color: #00d;
}

.error-message {
  margin-top: 15px;
  color: #f00;
  text-align: center;
  font-weight: bold;
}

.block-decoration {
  display: flex;
  width: 100%;
}

.brick, .solid {
  width: 12.5%;
  height: 32px;
}

.brick {
  background-color: #963;
  position: relative;
}

.brick:before, .brick:after {
  content: '';
  position: absolute;
  background-color: #742;
}

.brick:before {
  width: 100%;
  height: 2px;
  top: 10px;
}

.brick:after {
  width: 2px;
  height: 100%;
  left: 10px;
}

.solid {
  background-color: #666;
  border: 1px solid #888;
}

@media (max-width: 576px) {
  .button-row {
    flex-direction: column;
  }
  
  .primary-button, .secondary-button {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>