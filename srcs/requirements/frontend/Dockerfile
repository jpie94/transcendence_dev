# Étape 1 : génération du certificat
FROM debian:bookworm AS certs

RUN apt-get update && apt-get install -y openssl \
	&& cd /tmp \
	&& openssl rand -base64 48 > passphrase.txt \
	&& openssl genrsa -aes128 -passout file:passphrase.txt -out server.key 2048 \
	&& openssl req -new -passin file:passphrase.txt -key server.key -out server.csr \
	-subj "/C=FR/O=42school/OU=ft_transcendence project/CN=localhost" \
	-addext "subjectAltName=DNS:localhost,IP:127.0.0.1" \
	&& cp server.key server.key.org \
	&& openssl rsa -in server.key.org -passin file:passphrase.txt -out server.key \
	&& openssl x509 -req -days 36500 -in server.csr -signkey server.key -out server.crt \
	&& mkdir -p /output && mv server.key server.crt /output \
	&& chmod 600 /output/*


FROM debian:bookworm

# Installer Node + Nginx
RUN apt-get update && apt-get install -y openssl nano procps \
	curl ca-certificates gnupg nginx build-essential supervisor netcat-traditional \
	&& mkdir -p /etc/apt/keyrings \
	&& curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key \
		| gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
	&& echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] \
		https://deb.nodesource.com/node_20.x nodistro main" \
		> /etc/apt/sources.list.d/nodesource.list \
	&& apt-get update && apt-get install -y nodejs \
	&& apt-get clean && rm -rf /var/lib/apt/lists/*


WORKDIR /app
COPY app/package*.json ./
RUN npm install
COPY app .

# Copier les certificats
COPY --from=certs /output/server.crt /etc/ssl/certs/localhost.crt
COPY --from=certs /output/server.key /etc/ssl/certs/localhost.key

# Copier le fichier de config Nginx en fonction du mode
# COPY conf/default.${MODE}.conf /etc/nginx/conf.d/default
COPY conf/default.dev.conf /etc/nginx/sites-available/default

# Copier le fichier de configuration de supervisor
COPY conf/supervisor.conf /etc/supervisor/conf.d/supervisor.conf 

EXPOSE 443
# EXPOSE 5173

ADD tools /tmp/tools
RUN chmod +x /tmp/tools/entrypoint.sh

ENTRYPOINT ["/tmp/tools/entrypoint.sh"]
