.PHONY: start-next start-db up

start-next:
	yarn dev

start-db:
	docker-compose up -d --force-recreate

up: start-db start-next
