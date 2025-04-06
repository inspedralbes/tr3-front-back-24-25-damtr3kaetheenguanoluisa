import pymongo
import pandas as pd
import matplotlib.pyplot as plt
import os
import requests

image_save_path = os.path.join(os.path.dirname(__file__), 'stats.png')

MONGO_URI = "mongodb+srv://a23kaeguapio:Kim0117@cluster0.xt0iw.mongodb.net/bomberman?retryWrites=true&w=majority&appName=Cluster0"
client = pymongo.MongoClient(MONGO_URI)
db = client["tr3-Unity"]
collection = db["bomberman"]

API_ENDPOINT = "https://dam.inspedralbes.cat:22201/stats"

try:
    response = requests.get(API_ENDPOINT)
    response.raise_for_status()  

    if response.status_code == 200:
        data = response.json()
        
        bombes = data["bombes"]
        enemics = data["enemics"]
        players = data["players"] 

        df_bombes = pd.DataFrame([bombes])
        df_enemics = pd.DataFrame([enemics])

        print("Estadístiques de bombes llençades:")
        print(df_bombes)
        
        print("\nEstadístiques d'enemics eliminats:")
        print(df_enemics)

        categories = [players["player1"], players["player2"]]
        total_bombs = [bombes["totalPlayer1Bombs"], bombes["totalPlayer2Bombs"]]
        total_enemies = [enemics["totalPlayer1Enemy"], enemics["totalPlayer2Enemy"]]

        plt.figure(figsize=(10, 5))

        plt.subplot(1, 2, 1)
        plt.bar(categories, total_bombs, color=['blue', 'red'])
        plt.title("Total bombes utilitzades")
        plt.xlabel("Jugador")
        plt.ylabel("Bombes")

        plt.subplot(1, 2, 2)
        plt.bar(categories, total_enemies, color=['green', 'purple'])
        plt.title("Total enemics eliminats")
        plt.xlabel("Jugador")
        plt.ylabel("Enemics")

        plt.tight_layout()
        plt.savefig(image_save_path)

        print(f"Gràfics guardats a: {image_save_path}")

except requests.exceptions.RequestException as e:
    print(f"Error connecting to the stats API: {str(e)}")
    print(f"Attempted to connect to: {API_ENDPOINT}")
    raise 