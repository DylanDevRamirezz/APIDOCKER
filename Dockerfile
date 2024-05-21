# FROM nginx:latest

# # Copia el archivo de inicio personalizado y renómbralo como index.html
# COPY inicio.html /usr/share/nginx/html/inicio.html

# # Copia el archivo de configuración personalizado que contiene el mensaje de bienvenida
# COPY nginx.conf /etc/nginx/nginx.conf

# EXPOSE 8080

# FROM node:latest
# WORKDIR /app
# COPY . .
# RUN npm install --save-dev ts-node
# EXPOSE 8000
# CMD ["npm","start"]
