<template>
  <div class="admin-container">
    <nav class="sidebar">
      <div class="sidebar-content">
        <h2 class="sidebar-title">Admin Bomberman</h2>
        <ul class="nav-menu">
          <li>
            <nuxt-link to="/players" class="nav-link">
              <i class="icon players-icon"></i>
              <span>Administració jugadors</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/stats" class="nav-link">
              <i class="icon stats-icon"></i>
              <span>Estadístiques</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/microserveis" class="nav-link">
              <i class="icon stats-icon"></i>
              <span>Microserveis</span>
            </nuxt-link>
          </li>
        </ul>
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
                <span class="stat-value">{{ player.bombs }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Bombes Utilitzades</span>
                <span class="stat-value">{{ player.bombsUsed }}</span>
              </div>
            </div>
            <div class="stat-group">
              <div class="stat-item">
                <span class="stat-label">Speed</span>
                <span class="stat-value">{{ player.speed }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Victories</span>
                <span class="stat-value">{{ player.victories }}</span>
              </div>
            </div>
            <div class="total-stat">
              <span class="stat-label">Enemics derrotats</span>
              <span class="stat-value highlighted">{{ player.enemiesDefeated }}</span>
            </div>
          </div>
          <div class="player-card-actions">
            <button @click="editPlayer(player)" class="edit-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </button>

            <button @click="deletePlayerId(player)" class="delete-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getPlayers, deletePlayer, updatePlayer } from '@/services/communicationManager'

const players = ref([]);


async function allPlayers() {
  try {
    const response = await getPlayers();
    if (response.success) {
      players.value = response.players;
    }
  } catch (e) {
    console.error('Error fetching players:', e);
  }
}

async function deletePlayerId(player) {
  if (!player || !player.id) return;

  try {
    const response = await deletePlayer(player.id);
    console.log("Server response :", response);

    if (response.success) {
      players.value = players.value.filter(p => p.id !== player.id);
    } else {
      console.error("Failed to delete player:", response.message);
    }
  } catch (e) {
    console.error("Error deleting player:", e);
  }
}
async function editPlayer(updatedPlayerData) {
  try {
    const response = await updatePlayer(updatedPlayerData.id, updatedPlayerData); 

    if (response.success) {
      const index = players.value.findIndex(p => p.id === updatedPlayerData.id);
      if (index !== -1) players.value[index] = { ...updatedPlayerData };

      console.log("Player updated successfully");
    } else {
      console.error("Error update:", response.message);
    }
  } catch (e) {
    console.error("Error updated player:", e);
  }
}

onMounted(() => {
  allPlayers();
});

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
.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
}

.sidebar-title {
  font-size: 1.5rem;
  margin-bottom: 30px;
  text-align: center;
  color: #fff;
}

.nav-menu {
  list-style: none;
  padding: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  color: #bdc3c7;
  text-decoration: none;
  padding: 12px 15px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-link .icon {
  margin-right: 10px;
  width: 20px;
  height: 20px;
}

.main-content {
  flex-grow: 1;
  padding: 30px;
  overflow-y: auto;
}

.page-header {
  margin-bottom: 30px;
  border-bottom: 4px solid #3498db;
}

.page-header h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.player-card-actions {
  margin: auto;
  padding: 15px;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: center;
}

.delete-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  gap: 8px;
  margin: 5px;
}

.delete-button:hover {
  background-color: #c0392b;
  transform: scale(1.05);
}

.delete-button svg {
  width: 18px;
  height: 18px;
  stroke: white;
}

.edit-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #5d3eb1;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  gap: 8px;
  margin: 5px;
}

.edit-button:hover {
  background-color: #5d3eb1;
  transform: scale(1.05);
}

.edit-button svg {
  width: 18px;
  height: 18px;
  stroke: white;
}

.players-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.player-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.player-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.player-card-header {
  display: flex;
  align-items: center;
  background-color: #f1f4f8;
  padding: 15px;
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
  margin-right: 15px;
}

.player-avatar svg {
  width: 30px;
  height: 30px;
  fill: white;
}

.player-name {
  font-size: 1.2rem;
  color: #2c3e50;
  margin: 0;
}

.player-stats {
  padding: 15px;
}

.stat-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
}

.stat-label {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 5px;
}

.stat-value {
  color: #2980b9;
  font-weight: bold;
  font-size: 1.2rem;
}

.total-stat {
  text-align: center;
  background-color: #f1f4f8;
  padding: 10px;
  border-radius: 5px;
}

.total-stat .stat-label {
  display: block;
  margin-bottom: 5px;
}

.total-stat .highlighted {
  color: #27ae60;
  font-size: 1.1rem;
}
</style>