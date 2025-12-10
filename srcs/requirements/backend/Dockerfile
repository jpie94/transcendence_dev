FROM debian:bookworm

RUN		apt-get update && apt-get install -y \
		nodejs \
		npm

WORKDIR	/app

COPY	app .

EXPOSE	3000

ADD tools /tmp/tools
RUN chmod +x /tmp/tools/entrypoint.sh
ENTRYPOINT ["/tmp/tools/entrypoint.sh"]
