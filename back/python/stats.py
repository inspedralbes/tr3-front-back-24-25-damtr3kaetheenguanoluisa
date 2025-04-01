import requests
import pandas as pd
import matplotlib.pyplot as plt

# URL del microservicio MongoDB
MONGO_STATS_URL = "http://tr3-mongo-express:8081/stats"
# Obtener datos del backend
response = requests.get(MONGO_STATS_URL)

if response.status_code == 200:
    data = response.json()
    
    bombes = data["bombes"]
    enemics = data["enemics"]

    # Crear DataFrames para visualizar mejor
    df_bombes = pd.DataFrame([bombes])
    df_enemics = pd.DataFrame([enemics])

    print("📊 Estadísticas de Bombas Lanzadas:")
    print(df_bombes)
    
    print("\n🔥 Estadísticas de Enemigos Eliminados:")
    print(df_enemics)

    # Graficar las estadísticas
    categories = ["Player 1", "Player 2"]
    total_bombs = [bombes["totalPlayer1Bombs"], bombes["totalPlayer2Bombs"]]
    total_enemies = [enemics["totalPlayer1Enemy"], enemics["totalPlayer2Enemy"]]

    plt.figure(figsize=(10, 5))

    plt.subplot(1, 2, 1)
    plt.bar(categories, total_bombs, color=['blue', 'red'])
    plt.title("Total de Bombas Lanzadas")
    plt.xlabel("Jugador")
    plt.ylabel("Bombas")

    plt.subplot(1, 2, 2)
    plt.bar(categories, total_enemies, color=['green', 'purple'])
    plt.title("Total de Enemigos Eliminados")
    plt.xlabel("Jugador")
    plt.ylabel("Enemigos")

    plt.tight_layout()
    plt.savefig("stats.png")  # Guardar el gráfico como imagen
    plt.show()

else:
    print("❌ Error al obtener estadísticas:", response.status_code)
