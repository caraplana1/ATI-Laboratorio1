# Usar la imagen oficial de Ubuntu con Apache
FROM ubuntu/apache2:latest

# Actualizar el sistema e instalar herramientas útiles
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copiar todo el proyecto al directorio de Apache
COPY ./ /var/www/html/

# Habilitar el módulo mod_rewrite (opcional, común en proyectos web)
RUN a2enmod rewrite

# Exponer el puerto HTTP
EXPOSE 80

# Comando para iniciar Apache en primer plano
CMD ["apachectl", "-D", "FOREGROUND"]