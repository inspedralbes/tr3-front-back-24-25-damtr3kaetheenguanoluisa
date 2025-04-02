<template>
  <div class="bomberman-register-container">
    <div class="bomberman-background">
      <div class="grid-pattern"></div>
      <div class="bomberman-character"></div>
      <div class="bomb bomb1"></div>
      <div class="bomb bomb2"></div>
      <div class="bomb bomb3"></div>
      <div class="block block1"></div>
      <div class="block block2"></div>
      <div class="block block3"></div>
      <div class="block block4"></div>
      <div class="explosion explosion1"></div>
      <div class="explosion explosion2"></div>
    </div>
    <main class="register-card-wrapper">
      <div class="register-card">
        <div class="card-header">
          <div class="game-logo">
            <div class="logo-icon">B</div>
            <h1 class="logo-text">BOMBER<span>REGISTER</span></h1>
          </div>
        </div>

        <div class="register-form">
          <div class="form-group">
            <label for="username">Username</label>
            <div class="input-with-icon">
              <span class="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </span>
            <input 
              type="text" 
              id="username" 
              v-model="username" 
              class="game-input"
              autocomplete="username"
              placeholder="Introdueix l'email"
            />
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <div class="input-with-icon">
              <span class="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </span>
            <input 
              type="email" 
              id="email" 
              v-model="email" 
              class="game-input"
              autocomplete="email"
              placeholder="Introdueix el teu correu"
            />
            </div>
          </div>
          
          <div class="form-group">
            <label for="password">Contrassenya</label>
            <div class="input-with-icon">
              <span class="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
              </span>
            <input 
              type="password" 
              id="password" 
              v-model="password" 
              class="game-input"
              autocomplete="new-password"
              placeholder="Crear contrassenya"
            />
            </div>
          </div>

          <div class="error-message" v-if="error">
            <div class="error-icon">!</div>
            <span>{{ error }}</span>
          </div>
          
          <div class="button-group">
            <button @click="handleRegister" class=" game-button primary-button">
              <span class="button-text">REGISTER</span>
              <span class="button-shine"></span>
            </button>
            <NuxtLink to="/login" class=" game-button secondary-button">
              <span class="button-text">TORNAR</span>
              <span class="button-shine"></span>
            </NuxtLink>
          </div>
        </div>

        <div class="decoration">
          <div class="brick"></div>
          <div class="solid"></div>
          <div class="brick"></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { registerUser } from '~/services/communicationManager'

const router = useRouter()
const username = ref('')
const email = ref('')
const password = ref('')
const error = ref('')

async function handleRegister() {
  try {
    error.value = ''
    const response = await registerUser(username.value, email.value, password.value)
    
    if (response.success) {
      console.log('Registration successful')
      await router.push('/login')
    } else {
      error.value = response.message || 'Registration failed'
    }
  } catch (e) {
    console.error('Registration error:', e)
    error.value = e.message || 'An error occurred during registration'
  }
}
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', 'Arial', sans-serif;
}

html, body {
  height: 100%;
  width: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

.bomberman-register-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #1a2b63;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
}

/* Background Elements */
.bomberman-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(41, 64, 131, 0.8) 1px, transparent 1px), 
                    linear-gradient(90deg, rgba(41, 64, 131, 0.8) 1px, transparent 1px);
  background-size: 50px 50px;
  background-position: center center;
  z-index: -1;
}

.bomberman-character {
  position: absolute;
  bottom: 10%;
  right: 10%;
  width: 120px;
  height: 120px;
  background-image: url('/api/placeholder/120/120');
  background-size: contain;
  background-repeat: no-repeat;
  z-index: 1;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
  animation: float 4s ease-in-out infinite;
}

.bomb {
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: #000;
  border-radius: 50%;
  z-index: 1;
  box-shadow: 0 0 15px rgba(255, 100, 100, 0.7);
  animation: pulse 2s ease-in-out infinite;
}

.bomb1 {
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.bomb2 {
  top: 70%;
  left: 15%;
  animation-delay: 0.7s;
}

.bomb3 {
  top: 30%;
  right: 15%;
  animation-delay: 1.3s;
}

.bomb::after {
  content: '';
  position: absolute;
  top: -6px;
  right: -4px;
  width: 12px;
  height: 6px;
  background-color: #ff6b6b;
  border-radius: 6px 6px 0 0;
}

.block {
  position: absolute;
  width: 60px;
  height: 60px;
  background-color: #6e8ac4;
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.3);
  z-index: 1;
  border: 4px solid #395591;
}

.block1 {
  top: 35%;
  left: 10%;
  transform: rotate(10deg);
}

.block2 {
  top: 15%;
  right: 15%;
  transform: rotate(-5deg);
}

.block3 {
  bottom: 25%;
  left: 25%;
  transform: rotate(15deg);
}

.block4 {
  bottom: 45%;
  right: 25%;
  transform: rotate(-8deg);
}

.explosion {
  position: absolute;
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, #ffeb3b 0%, #ff9800 50%, transparent 70%);
  border-radius: 50%;
  opacity: 0.7;
  z-index: 0;
  animation: explode 3s ease-in-out infinite;
}

.explosion1 {
  bottom: 30%;
  right: 30%;
  animation-delay: 1s;
}

.explosion2 {
  top: 40%;
  left: 30%;
  animation-delay: 2s;
}

.register-card-wrapper {
  position: relative;
  z-index: 10;
}

.register-card {
  height: 700px;
  width: 700px;
  background-color: #14204e;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 
              0 0 50px rgba(114, 155, 255, 0.5);
  border: 2px solid #3a4980;
  transform-style: preserve-3d;
  transform: rotateX(2deg) rotateY(-2deg);
  animation: cardFloat 4s ease-in-out infinite alternate;
}

.card-header {
  background: linear-gradient(135deg, #3251a6 0%, #1b2f69 100%);
  color: white;
  padding: 25px;
  text-align: center;
  position: relative;
  border-bottom: 4px solid #3a4980;
}

.game-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.logo-icon {
  width: 50px;
  height: 50px;
  background-color: #ff5252;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.2), 
              0 0 15px rgba(255, 82, 82, 0.7);
  position: relative;
}

.logo-icon::before {
  content: '';
  position: absolute;
  top: -6px;
  right: -2px;
  width: 12px;
  height: 8px;
  background-color: #ff9e80;
  border-radius: 6px 6px 0 0;
}

.logo-text {
  font-size: 24px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #fff;
  font-family: 'Arial Black', sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.logo-text span {
  color: #5bafff;
}

.register-form {
  padding: 80px;
}

.form-group {
  margin-bottom: 30px;
}

.form-group label {
  display: block;
  margin-bottom: 20px;
  color: #7f9cf5;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.input-with-icon {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-icon svg {
  width: 20px;
  height: 20px;
  fill: #5d77c7;
}

.game-input {
  width: 100%;
  padding: 14px 14px 14px 45px;
  background-color: #102048;
  border: 2px solid #3a4980;
  border-radius: 10px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.2);
}

.game-input:focus {
  outline: none;
  border-color: #5bafff;
  box-shadow: 0 0 0 3px rgba(91, 175, 255, 0.3), 
              inset 0 2px 5px rgba(0, 0, 0, 0.2);
}

.game-input::placeholder {
  color: #475898;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ff5252;
  margin-bottom: 20px;
  padding: 10px 15px;
  background-color: rgba(255, 82, 82, 0.15);
  border-radius: 10px;
  border-left: 4px solid #ff5252;
  animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97);
}

.error-icon {
  width: 24px;
  height: 24px;
  background-color: #ff5252;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  flex-shrink: 0;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.game-button {
  position: relative;
  padding: 14px 20px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  text-align: center;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-text {
  position: relative;
  z-index: 2;
}

.button-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.2) 50%,
    transparent 100%
  );
  z-index: 1;
  transition: left 0.7s ease;
}

.game-button:hover .button-shine {
  left: 100%;
}

.primary-button {
  background: linear-gradient(135deg, #3e8eff 0%, #2463d8 100%);
  color: white;
  box-shadow: 0 4px 0 #1946a0, 
              0 5px 15px rgba(0, 0, 0, 0.3);
}

.primary-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 0 #1946a0, 
              0 8px 20px rgba(0, 0, 0, 0.3);
}

.primary-button:active {
  transform: translateY(2px);
  box-shadow: 0 2px 0 #1946a0, 
              0 3px 10px rgba(0, 0, 0, 0.3);
}

.secondary-button {
  background: linear-gradient(135deg, #5d6590 0%, #424c77 100%);
  color: #c0cfff;
  box-shadow: 0 4px 0 #2c355e, 
              0 5px 15px rgba(0, 0, 0, 0.2);
}

.secondary-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 0 #2c355e, 
              0 8px 20px rgba(0, 0, 0, 0.2);
}

.secondary-button:active {
  transform: translateY(2px);
  box-shadow: 0 2px 0 #2c355e, 
              0 3px 10px rgba(0, 0, 0, 0.2);
}
.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #7f9cf5;
  user-select: none;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: relative;
  height: 18px;
  width: 18px;
  background-color: #102048;
  border: 2px solid #3a4980;
  border-radius: 4px;
  margin-right: 8px;
  transition: all 0.2s;
}

.checkbox-container:hover input ~ .checkmark {
  background-color: #162958;
}

.checkbox-container input:checked ~ .checkmark {
  background-color: #3e8eff;
  border-color: #3e8eff;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
  left: 5px;
  top: 2px;
  width: 5px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.forgot-link {
  color: #5bafff;
  text-decoration: none;
  transition: color 0.2s;
}

.forgot-link:hover {
  color: #84c8ff;
  text-decoration: underline;
}

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
}

@keyframes explode {
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1); opacity: 0.7; }
  100% { transform: scale(0.8); opacity: 0; }
}

@keyframes cardFloat {
  0% { transform: rotateX(2deg) rotateY(-2deg) translateY(0); }
  100% { transform: rotateX(4deg) rotateY(-4deg) translateY(-10px); }
}

@keyframes shake {
  10%, 90% { transform: translateX(-1px); }
  20%, 80% { transform: translateX(2px); }
  30%, 50%, 70% { transform: translateX(-3px); }
  40%, 60% { transform: translateX(3px); }
}

/* Responsive Styles */
@media (max-width: 500px) {
  .register-card {
    width: 90%;
    max-width: 350px;
    transform: none;
    animation: none;
  }
  
  .bomberman-character {
    width: 80px;
    height: 80px;
    bottom: 5%;
    right: 5%;
  }
  
  .bomb, .block {
    display: none;
  }
  
  .explosion {
    opacity: 0.4;
  }
  
  .logo-text {
    font-size: 20px;
  }
  
  .game-input {
    padding: 12px 12px 12px 40px;
  }
  
  .options-panel {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
}
</style>