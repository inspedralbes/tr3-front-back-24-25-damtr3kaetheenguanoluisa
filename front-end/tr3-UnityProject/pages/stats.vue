<template>
  <div class="admin-container">
    <nav class="sidebar">
      <div class="sidebar-content">
        <h2 class="sidebar-title">Admin Bomberman</h2>
        <ul class="nav-menu">
          <!-- <li>
              <nuxt-link to="/menuGame" class="nav-link">
                <i class="icon players-icon"></i>
                <span>Inici</span>
              </nuxt-link>
            </li> -->
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
        <h1>Estadístiques</h1>
      </header>

      <div class="stats-container">
        <div v-if="stats">
          <h2>Dades Estadístiques</h2>
          <pre>{{ stats }}</pre>
        </div>
        <p v-else>Cargando estadísticas...</p>

        <div class="image-container" v-if="imageUrl">
          <h2>Gráfica de Estadísticas</h2>
          <img :src="imageUrl" alt="Gráfica de estadísticas" />
        </div>

        <button @click="generateImage">Generar Imagen</button>
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
  padding: 15px;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: center;
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
  font-size: 0.8rem;
  margin-bottom: 5px;
}

.stat-value {
  color: #2980b9;
  font-weight: bold;
  font-size: 1rem;
}

.stats-container {
  background: #ecf0f1;
  padding: 20px;
  border-radius: 10px;
}
</style>