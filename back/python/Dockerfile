# Dockerfile en ./back/python/
FROM python:3.9-slim

# Configurar el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar el archivo requirements.txt para instalar dependencias
COPY requirements.txt ./

# Instalar las dependencias desde el archivo requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto de los archivos de la carpeta al contenedor
COPY . .

# Comando por defecto para ejecutar stats.py
CMD ["python", "stats.py"]
