<template>
  <div class="register-container">
    <div class="game-screen">
      <div class="game-title">
        <div class="bomb-sprite"></div>
        <h1>BOMBERMAN</h1>
        <div class="bomb-sprite"></div>
      </div>
      
      <div class="register-form">
        <h2>REGISTER</h2>
        
        <div class="form-group">
          <label for="username">USERNAME:</label>
          <input 
            type="text" 
            id="username" 
            v-model="username" 
            class="retro-input"
            autocomplete="username"
          />
        </div>
        
        <div class="form-group">
          <label for="email">EMAIL:</label>
          <input 
            type="email" 
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
            autocomplete="new-password"
          />
        </div>    
        <div class="button-row">
          <button @click="handleRegister" class="retro-button primary-button">
            REGISTER
          </button>
          
          <NuxtLink to="/login" class="retro-button secondary-button">
            BACK
          </NuxtLink>
        </div>
        
        <div v-if="error" class="error-message">
          {{ error }}
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
import { registerUser } from '../services/communicationManager.js'

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')

async function handleRegister() {
  try {
    const data = await registerUser(username.value, email.value,password.value, ) 
    router.push('/login')
  } catch (error) {
    alert(error.message)
    console.error('Error in registration:', error)
  }
}
</script>

<style scoped>
.register-container {
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

.register-form {
  background-color: #335;
  padding: 20px;
  border: 4px solid #557;
  margin-bottom: 30px;
}

.register-form h2 {
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

.character-select {
  margin-top: 20px;
  margin-bottom: 20px;
}

.character-select h3 {
  color: #fff;
  margin-bottom: 10px;
  font-size: 18px;
}

.character-row {
  display: flex;
  justify-content: space-between;
}

.character-option {
  width: 60px;
  height: 60px;
  background-color: #223;
  border: 3px solid #335;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.character-option.selected {
  border-color: #ff0;
  box-shadow: 0 0 10px #ff0;
}

.character-sprite {
  width: 32px;
  height: 32px;
  background-color: #fff;
}

.character-1 {
  background-color: #fff;
  border-radius: 50% 50% 0 0;
}

.character-2 {
  background-color: #0f0;
  border-radius: 50% 50% 0 0;
}

.character-3 {
  background-color: #00f;
  border-radius: 50% 50% 0 0;
}

.character-4 {
  background-color: #f00;
  border-radius: 50% 50% 0 0;
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
  
  .character-row {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .character-option {
    margin: 5px;
  }
}
</style>