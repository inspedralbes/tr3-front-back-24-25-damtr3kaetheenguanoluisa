import pymongo
import pandas as pd
import matplotlib.pyplot as plt

MONGO_URI = "mongodb+srv://a23kaeguapio:Kim0117@cluster0.xt0iw.mongodb.net/bomberman?retryWrites=true&w=majority&appName=Cluster0"
client = pymongo.MongoClient(MONGO_URI)
db = client["tr3-Unity"] 
collection = db["bomberman"] 

import requests

API_ENDPOINT = "http://localhost:3021/stats"
response = requests.get(API_ENDPOINT)

if response.status_code == 200:
    data = response.json()
    
    bombes = data["bombes"]
    enemics = data["enemics"]

    df_bombes = pd.DataFrame([bombes])
    df_enemics = pd.DataFrame([enemics])

    print("📊 Estadísticas de Bombas Lanzadas:")
    print(df_bombes)
    
    print("\n🔥 Estadísticas de Enemigos Eliminados:")
    print(df_enemics)

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
    plt.savefig("stats.png")
    plt.show()

else:
    print("❌ Error al obtener estadísticas:", response.status_code)
