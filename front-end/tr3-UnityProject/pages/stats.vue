<template>
  <div class="admin-container">
    <nav class="sidebar">
      <div class="sidebar-content">
        <div class="sidebar-header">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            class="logo-icon">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="10" r="3" />
            <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
          </svg>
          <h2 class="sidebar-title">Admin Bomberman</h2>
        </div>
        <ul class="nav-menu">
          <li>
            <NuxtLink to="/players" class="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" class="nav-icon">
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" class="nav-icon">
                <path d="M18 20V10"></path>
                <path d="M12 20V4"></path>
                <path d="M6 20v-6"></path>
              </svg>
              <span>Estadístiques</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/microserveis" class="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" class="nav-icon">
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
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
        <h1>Estadístiques</h1>
      </header>

      <div class="stats-container">
       
        <div v-if="stats" class="stats-dashboard">
          <div class="stats-cards">
            <div class="stats-card bombs">
              <div class="card-header">
                <svg xmlns="http://www.w3.org/2000/svg" class="card-icon" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <h3>Bombes Utilitzades</h3>
              </div>
              <div class="card-content">
                <div class="player-stat">
                  <span class="stat-value">
                    {{ stats.players?.player1 }}: {{ stats.bombes.totalPlayer1Bombs }}
                  </span>
                </div>
                <div class="player-stat">
                  <span class="stat-value">
                    {{ stats.players?.player2 }}: {{ stats.bombes.totalPlayer2Bombs }}
                  </span>
                </div>
              </div>
            </div>

            <div class="stats-card enemies">
              <div class="card-header">
                <svg xmlns="http://www.w3.org/2000/svg" class="card-icon" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                <h3>Enemics Eliminats</h3>
              </div>
              <div class="card-content">

                <div class="player-stat">
                  <span class="stat-value">
                    {{ stats.players?.player1 }}: {{ stats.enemics.totalPlayer1Enemy }}
                  </span>
                </div>
                <div class="player-stat">
                  <span class="stat-value">
                    {{ stats.players?.player2 }}: {{ stats.enemics.totalPlayer2Enemy }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="graph-section">
            <div class="image-container" v-if="imageUrl">
              <h2>Gráfica de Estadísticas</h2>
              <img :src="imageUrl" alt="Gráfica de estadísticas" class="stats-image" />
            </div>
            <button @click="generateImage" class="generate-button">
              <svg xmlns="http://www.w3.org/2000/svg" class="button-icon" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              Generar Gráfica
            </button>
          </div>
        </div>
        <p v-else class="loading">Cargando estadísticas...</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const servers = ["http://localhost:3021/stats"];
const currentServer = ref(servers[0]);
const stats = ref(null);
const imageUrl = ref('');
let intervalId = null;

const fetchStats = async () => {
  try {
    const response = await fetch(currentServer.value, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener estadísticas');
    }

    stats.value = await response.json();
    console.log("Datos recibidos:", stats.value);
  } catch (error) {
    console.error("Error fetching stats:", error);
  }
};

const generateImage = async () => {
  try {
    const response = await fetch('http://localhost:3021/stats/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al generar la imagen');
    }

    imageUrl.value = 'http://localhost:3021/stats-image';
  } catch (error) {
    console.error('Error al generar la imagen:', error);
  }
};


// const startImageCheck = () => {
//   intervalId = setInterval(async () => {
//     const imageResponse = await fetch('http://localhost:3021/stats/stats.png');

//     if (imageResponse.ok) {
//       imageUrl.value = 'http://localhost:3021/stats/stats.png'; 
//       clearInterval(intervalId); 
//     }
//   }, 2000); 

//   setTimeout(() => {
//     clearInterval(intervalId);
//     alert("La imagen no se generó a tiempo.");
//   }, 20000); 
// };

onMounted(fetchStats);
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

.stats-container {
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.game-selector {
  margin-bottom: 30px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.game-selector h2 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.game-select {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #e0e6ed;
  border-radius: 8px;
  background-color: white;
  color: #2c3e50;
  cursor: pointer;
  transition: all 0.3s ease;
}

.game-select:hover {
  border-color: #3498db;
}

.game-select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

.stats-dashboard {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.stats-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.stats-card:hover {
  transform: translateY(-5px);
}

.stats-card.bombs {
  border-top: 4px solid #3498db;
}

.stats-card.enemies {
  border-top: 4px solid #e74c3c;
}

.card-header {
  padding: 20px;
  background: #f8fafc;
  border-bottom: 1px solid #e0e6ed;
  display: flex;
  align-items: center;
  gap: 15px;
}

.card-icon {
  width: 24px;
  height: 24px;
  color: #3498db;
}

.stats-card.enemies .card-icon {
  color: #e74c3c;
}

.card-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.2rem;
  font-weight: 600;
}

.card-content {
  padding: 20px;
}

.player-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e6ed;
}

.player-stat:last-child {
  border-bottom: none;
}

.player-name {
  color: #2c3e50;
  font-weight: 500;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #3498db;
}

.stats-card.enemies .stat-value {
  color: #e74c3c;
}

.graph-section {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.stats-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 20px 0;
}

.generate-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #2ecc71;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.generate-button:hover {
  background: #27ae60;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(46, 204, 113, 0.2);
}

.button-icon {
  width: 20px;
  height: 20px;
}

.loading {
  text-align: center;
  color: #7f8c8d;
  font-size: 1.1rem;
  padding: 20px;
}
</style>