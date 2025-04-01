<template>
  <div class="admin-container">
    <!-- Main Content Area -->
    <main class="main-content">
      <div class="register-card">
        <div class="card-header">
          <div class="header-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <h1>Create Account</h1>
        </div>

        <div class="register-form">
          <div class="form-group">
            <label for="username">Username</label>
            <input 
              type="text" 
              id="username" 
              v-model="username" 
              class="modern-input"
              autocomplete="username"
              placeholder="Choose a username"
            />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              v-model="email" 
              class="modern-input"
              autocomplete="email"
              placeholder="Enter your email"
            />
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              v-model="password" 
              class="modern-input"
              autocomplete="new-password"
              placeholder="Create a password"
            />
          </div>

          <div class="error-message" v-if="error">{{ error }}</div>
          
          <div class="button-group">
            <button @click="handleRegister" class="primary-button">
              Register
            </button>
            <NuxtLink to="/login" class="secondary-button">
              Back to Login
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
}

html, body {
  height: 100%;
  width: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

.admin-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #1a1a2e;
  font-family: 'Segoe UI', sans-serif;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
}

.main-content {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.register-card {
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 450px;
  overflow: hidden;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.card-header {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  padding: 30px;
  text-align: center;
  position: relative;
}

.header-icon {
  width: 70px;
  height: 70px;
  background-color: white;
  border-radius: 50%;
  margin: 0 auto 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.header-icon svg {
  width: 42px;
  height: 42px;
  fill: #3498db;
}

.card-header h1 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: 1px;
}

.register-form {
  padding: 30px;
}

.form-group {
  margin-bottom: 22px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 500;
  font-size: 0.95rem;
}

.modern-input {
  width: 100%;
  padding: 14px;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #f8f9fa;
}

.modern-input:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  background-color: white;
}

.modern-input::placeholder {
  color: #adb5bd;
}

.error-message {
  color: #e74c3c;
  margin-bottom: 20px;
  text-align: center;
  font-size: 0.9rem;
  background-color: rgba(231, 76, 60, 0.1);
  padding: 10px;
  border-radius: 8px;
  border-left: 3px solid #e74c3c;
}

.button-group {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.primary-button, .secondary-button {
  flex: 1;
  padding: 14px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.primary-button {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  box-shadow: 0 4px 10px rgba(52, 152, 219, 0.3);
}

.secondary-button {
  background-color: #e9ecef;
  color: #2c3e50;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.primary-button:hover, .secondary-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.primary-button:active, .secondary-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.solid {
  background-color: #7f8c8d;
}

@media (max-width: 768px) {
  .register-card {
    width: 95%;
    margin: 0;
  }

  .card-header {
    padding: 25px;
  }

  .register-form {
    padding: 25px;
  }

  .button-group {
    flex-direction: column;
  }
}
</style>