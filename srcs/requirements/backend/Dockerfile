# From Debian bookworm
FROM debian:bookworm

ARG DEBIAN_FRONTEND=noninteractive

# Installation des outils de base
RUN		apt-get update && apt-get install -y \
		curl \
		ca-certificates \
		gnupg \
		build-essential

# Installation de Node.js depuis NodeSource
# (ajout de la clé GPG + dépôt officiel)
RUN		mkdir -p /etc/apt/keyrings \
		&& curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
		&& echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" > /etc/apt/sources.list.d/nodesource.list \
		&& apt-get update && apt-get install -y nodejs

# Installation de SQLite3 (ici !)
# ⚙️ on installe à la fois :
#   - le client sqlite3 (pour tester/debug)
#   - la lib de développement (libsqlite3-dev)
# pour permettre à npm de compiler les modules natifs (better-sqlite3)
RUN		apt-get install -y sqlite3 libsqlite3-dev \
		&& apt-get clean && rm -rf /var/lib/apt/lists/*

# Create user and set working directory
RUN		useradd -m -s /bin/bash nodeuser

WORKDIR	/app

# Copy package.json + package-lock.json first
COPY  app/package*.json ./

# Install dependencies (express sera installé ici)
RUN		npm install

# Copy remaining code (app.js, public/, etc.)
COPY	app .

# Create data directory an give permissions
RUN		mkdir -p /data && chown -R nodeuser:nodeuser /app /data

# Mode non-root user
USER	nodeuser

# Expose internal port
EXPOSE	3000

# Start server dev mode
CMD ["npm", "run", "dev"]
