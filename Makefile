all: up

_volumes-dir:
	@mkdir -p /tmp/data
	@mkdir -p /tmp/data/frontend
	@mkdir -p /tmp/data/backend

up: _volumes-dir
	@docker compose -f srcs/docker-compose.yml up --build -d
	@docker image prune -af

down:
	@docker compose -f srcs/docker-compose.yml down

start:
	@docker compose -f srcs/docker-compose.yml start

stop:
	@docker compose -f srcs/docker-compose.yml stop

clean:
	@$(MAKE) down

fclean: clean
	@docker compose -f srcs/docker-compose.yml down --volumes --rmi all
	@docker system prune --all --force --volumes
	@rm -rf /tmp/data

re:
	@$(MAKE) fclean
	@$(MAKE) all

.PHONY: all build up down start stop clean fclean re
