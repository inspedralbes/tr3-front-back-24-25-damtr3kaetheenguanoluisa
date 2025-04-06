<template>
  <div class="admin-container">
    <nav class="sidebar">
      <div class="sidebar-content">
        <div class="sidebar-header">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="logo-icon">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="10" r="3"/>
            <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>
          </svg>
          <h2 class="sidebar-title">Admin Bomberman</h2>
        </div>
        <ul class="nav-menu">
          <li>
            <NuxtLink to="/players" class="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="nav-icon">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>Administració jugadors</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/stats" class="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="nav-icon">
                <path d="M18 20V10"></path>
                <path d="M12 20V4"></path>
                <path d="M6 20v-6"></path>
              </svg>
              <span>Estadístiques</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/microserveis" class="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="nav-icon">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              <span>Microserveis</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="sidebar-footer">
        <div class="user-info">
          <div class="user-avatar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <span>Admin</span>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <header class="page-header">
        <h1>Administració de jugadors</h1>
      </header>

      <div class="players-grid">
        <div v-for="player in players" :key="player.id" class="player-card">
          <div class="player-card-header">
            <div class="player-avatar">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <h2 class="player-name">{{ player.username }}</h2>
          </div>

          <div class="player-stats">
            <div class="stat-group">
              <div class="stat-item">
                <span class="stat-label">Bombes</span>
                <div v-if="player.isEditing" class="slider-container">
                  <input type="range" v-model="player.bombs" min="1" max="20" class="slider" />
                  <span class="slider-value">{{ player.bombs }}</span>
                </div>
                <span v-else class="stat-value">{{ player.bombs }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Bombes Utilitzades</span>
                <div v-if="player.isEditing" class="input-container">
                  <input type="number" v-model="player.bombsUsed" class="number-input" />
                </div>
                <span v-else class="stat-value">{{ player.bombsUsed }}</span>
              </div>
            </div>
            <div class="stat-group">
              <div class="stat-item">
                <span class="stat-label">Speed</span>
                <div v-if="player.isEditing" class="slider-container">
                  <input type="range" v-model="player.speed" min="1" max="10" class="slider" />
                  <span class="slider-value">{{ player.speed }}</span>
                </div>
                <span v-else class="stat-value">{{ player.speed }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Victories</span>
                <div v-if="player.isEditing" class="input-container">
                  <input type="number" v-model="player.victories" class="number-input" />
                </div>
                <span v-else class="stat-value">{{ player.victories }}</span>
              </div>
            </div>
          </div>
          <div class="player-card-actions">
            <button v-if="!player.isEditing" @click="editPlayer(player)" class="edit-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
              <span>Editar</span>
            </button>
            <button v-else @click="savePlayer(player)" class="save-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              <span>Guardar</span>
            </button>
            <button @click="deletePlayerById(player.id)" class="delete-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              <span>Eliminar</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getPlayers, deletePlayer, updatePlayer } from '@/services/communicationManager';

const players = ref([]);

const editPlayer = (player) => {
  player.isEditing = true;
};

const savePlayer = async (player) => {
  try {
    await updatePlayer(player.id, player);
    player.isEditing = false;
  } catch (error) {
    console.error('Error al guardar el jugador:', error);
  }
};

const deletePlayerById = async (playerId) => {
  try {
    await deletePlayer(playerId);
    players.value = players.value.filter(player => player.id !== playerId);
  } catch (error) {
    console.error('Error al eliminar el jugador:', error);
  }
};

const fetchPlayers = async () => {
  try {
    const response = await getPlayers();
    if (response.success) {
      players.value = response.players.map(player => ({ ...player, isEditing: false }));
    }
  } catch (error) {
    console.error('Error al obtener jugadores:', error);
  }
};

onMounted(fetchPlayers);
</script>

<style scoped>
.admin-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #f4f6f9;
  position: fixed;
  top: 0;
  left: 0;
}

/* Sidebar mejorada */
.sidebar {
  width: 280px;
  background: linear-gradient(to bottom, #2c3e50, #1a2530);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;
}

.sidebar-header {
  display: flex;
  align-items: center;
  padding: 25px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-icon {
  width: 28px;
  height: 28px;
  stroke: #3498db;
  margin-right: 12px;
}

.sidebar-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
  color: #fff;
}

.sidebar-content {
  flex-grow: 1;
  overflow-y: auto;
}

.nav-menu {
  list-style: none;
  padding: 0;
  margin-top: 15px;
}

.nav-link {
  display: flex;
  align-items: center;
  color: #a7b6c2;
  text-decoration: none;
  padding: 14px 20px;
  border-radius: 8px;
  margin: 5px 10px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  transform: translateX(5px);
}

.nav-link.router-link-active {
  background-color: rgba(52, 152, 219, 0.2);
  color: #3498db;
  border-left: 4px solid #3498db;
}

.nav-icon {
  width: 22px;
  height: 22px;
  margin-right: 12px;
  stroke: currentColor;
}

.sidebar-footer {
  padding: 15px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.user-avatar svg {
  width: 20px;
  height: 20px;
  stroke: #3498db;
}

/* Contenido principal */
.main-content {
  flex-grow: 1;
  padding: 30px;
  overflow-y: auto;
}

.page-header {
  margin-bottom: 30px;
  border-bottom: 4px solid #3498db;
  padding-bottom: 10px;
}

.page-header h1 {
  color: #2c3e50;
  font-size: 2.2rem;
  margin-bottom: 15px;
  font-weight: 600;
}

/* Estilo de las tarjetas de jugadores */
.players-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.player-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.player-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}

.player-card-header {
  display: flex;
  align-items: center;
  background: linear-gradient(to right, #f1f4f8, #e6eef7);
  padding: 18px;
  border-bottom: 1px solid #e9ecef;
}

.player-avatar {
  width: 50px;
  height: 50px;
  background-color: #3498db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
}

.player-avatar svg {
  width: 30px;
  height: 30px;
  fill: white;
}

.player-name {
  font-size: 1.3rem;
  color: #2c3e50;
  margin: 0;
  font-weight: 600;
}

.player-stats {
  padding: 18px;
}

.stat-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  text-align: center;
  width: 100%;
}

.stat-label {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 8px;
  font-weight: 500;
}

.stat-value {
  color: #2980b9;
  font-weight: bold;
  font-size: 1.45rem;
}

.slider-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.slider {
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: #dfe6e9;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
  margin: 10px 0;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #3498db;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
}

.slider::-webkit-slider-thumb:hover {
  background: #2980b9;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
  transform: scale(1.1);
}

.slider::-moz-range-thumb {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #3498db;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
  border: none;
}

.slider::-moz-range-thumb:hover {
  background: #2980b9;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
  transform: scale(1.1);
}

.slider-value {
  font-size: 1.2rem;
  color: #3498db;
  font-weight: bold;
  margin-top: 5px;
  background-color: #f1f4f8;
  padding: 4px 12px;
  border-radius: 12px;
  min-width: 30px;
  text-align: center;
}

.input-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.number-input {
  width: 80px;
  padding: 8px 12px;
  border: 2px solid #e0e6ed;
  border-radius: 8px;
  font-size: 1rem;
  text-align: center;
  transition: all 0.3s ease;
  color: #3498db;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.number-input:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  outline: none;
}

.number-input::-webkit-inner-spin-button,
.number-input::-webkit-outer-spin-button {
  opacity: 1;
  height: 24px;
}

/* Estilos para los botones de acción */
.player-card-actions {
  padding: 15px;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: center;
  gap: 12px;
}

.edit-button,
.save-button,
.delete-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-weight: 500;
  gap: 8px;
  min-width: 100px;
}

.edit-button {
  background-color: #3498db;
  color: white;
}

.edit-button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.save-button {
  background-color: #2ecc71;
  color: white;
}

.save-button:hover {
  background-color: #27ae60;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.delete-button {
  background-color: #e74c3c;
  color: white;
}

.delete-button:hover {
  background-color: #c0392b;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.edit-button svg,
.save-button svg,
.delete-button svg {
  width: 18px;
  height: 18px;
  stroke: currentColor;
}
</style>