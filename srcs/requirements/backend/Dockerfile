FROM debian:bookworm

RUN		apt-get update && apt-get install -y \
		nodejs \
		npm

RUN		useradd -m -s /bin/bash nodeuser

WORKDIR	/app

COPY  app/package*.json ./

RUN		npm install

COPY	app .

RUN		mkdir -p /data && chown -R nodeuser:nodeuser /app /data

USER	nodeuser

EXPOSE	3000

CMD ["npm", "run", "dev"]
