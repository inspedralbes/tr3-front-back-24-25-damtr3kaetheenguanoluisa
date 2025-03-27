<template>
  <div class="bomberman-layout">
    <div class="sidebar">
      <div class="logo-container">
        <div class="bomb-logo">
          <div class="bomb-body"></div>
          <div class="bomb-fuse"></div>
        </div>
        <h1 class="site-title">Bomberman</h1>
      </div>

      <nav class="nav-menu">
        <NuxtLink to="/menuGame" class="nav-item">
          <div class="nav-icon home-icon"></div>
          <span>Inici</span>
        </NuxtLink>
        <NuxtLink to="/manage" class="nav-item">
          <div class="nav-icon stages-icon"></div>
          <span>Administració Enemics</span>
        </NuxtLink>
        <NuxtLink to="/players" class="nav-item">
          <div class="nav-icon characters-icon"></div>
          <span>Administració Jugadors</span>
        </NuxtLink>
        <NuxtLink to="/stats" class="nav-item">
          <div class="nav-icon powers-icon"></div>
          <span>Estadístiques</span>
        </NuxtLink>
      </nav>

      <div class="logout-container">
        <button @click="logout" class="logout-button">
          <div class="explosion-icon"></div>
          <span>Exit</span>
        </button>
      </div>
    </div>

    <div class="main-content">
      <div class="block-border top-border"></div>
      <div class="content-wrapper">
        <slot />
      </div>
      <div class="block-border bottom-border"></div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
.bomberman-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f0f0f0;
}

.sidebar {
  width: 280px;
  background-color: #1a4ba5; 
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin-bottom: 20px;
}

.bomb-logo {
  position: relative;
  width: 40px;
  height: 40px;
  margin-right: 15px;
}

.bomb-body {
  width: 40px;
  height: 40px;
  background-color: #000;
  border-radius: 50%;
  position: relative;
}

.bomb-body::before, .bomb-body::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #fff;
  border-radius: 50%;
  top: 10px;
}

.bomb-body::before {
  left: 8px;
}

.bomb-body::after {
  right: 8px;
}

.bomb-fuse {
  position: absolute;
  width: 6px;
  height: 15px;
  background-color: #8a5c2e;
  top: -15px;
  left: 17px;
  transform: rotate(-15deg);
}

.bomb-fuse::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: #ff9900;
  border-radius: 50%;
  top: -5px;
  left: -1px;
  box-shadow: 0 0 8px #ff9900;
}

.site-title {
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}

/* Menú de navegación */
.nav-menu {
  flex-grow: 1;
  padding: 0 20px;
}

.nav-item {
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.nav-item:hover {
  background-color: #2e5dbb;
}

.nav-icon {
  width: 32px;
  height: 32px;
  margin-right: 15px;
  border-radius: 50%;
  position: relative;
}

.home-icon {
  background-color: #ff5252; /* Rojo */
}

.games-icon {
  background-color: #ffeb3b; /* Amarillo */
}

.characters-icon {
  background-color: #4caf50; /* Verde */
}

.stages-icon {
  background-color: #9c27b0; /* Púrpura */
}

.powers-icon {
  background-color: #00bcd4; /* Cian */
}

/* Botón de salir */
.logout-container {
  padding: 0 20px 20px;
}

.logout-button {
  display: flex;
  align-items: center;
  background-color: #ff3d00;
  color: white;
  border: none;
  padding: 12px 15px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #dd2c00;
}

.explosion-icon {
  width: 32px;
  height: 32px;
  background-color: #ffeb3b;
  border-radius: 50%;
  margin-right: 15px;
  position: relative;
}

.explosion-icon::before, .explosion-icon::after {
  content: '';
  position: absolute;
  background-color: #ff9800;
}

.explosion-icon::before {
  width: 20px;
  height: 6px;
  top: 13px;
  left: 6px;
}

.explosion-icon::after {
  width: 6px;
  height: 20px;
  top: 6px;
  left: 13px;
}

/* Contenido principal */
.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #f5f5f5;
}

.content-wrapper {
  flex-grow: 1;
  padding: 30px;
  background-color: white;
  margin: 0 20px;
  border-left: 3px solid #ccc;
  border-right: 3px solid #ccc;
  min-height: calc(100vh - 40px);
}

/* Bordes de bloques estilo Bomberman */
.block-border {
  height: 20px;
  display: flex;
  margin: 0 20px;
}

.top-border, .bottom-border {
  background-image: linear-gradient(to right, 
    #8d8d8d 0px, #8d8d8d 40px, 
    #acacac 40px, #acacac 80px,
    #8d8d8d 80px, #8d8d8d 120px,
    #acacac 120px, #acacac 160px,
    #8d8d8d 160px, #8d8d8d 200px,
    #acacac 200px, #acacac 240px,
    #8d8d8d 240px, #8d8d8d 280px,
    #acacac 280px, #acacac 320px,
    #8d8d8d 320px, #8d8d8d 360px,
    #acacac 360px, #acacac 400px);
  background-size: 400px 20px;
  background-repeat: repeat-x;
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .bomberman-layout {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    padding: 10px 0;
  }
  
  .nav-menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .nav-item {
    width: 45%;
    margin: 5px;
  }
  
  .content-wrapper {
    margin: 0;
    border-left: none;
    border-right: none;
  }
  
  .block-border {
    margin: 0;
  }
}
</style>