NAME                            := tamagotchi-server
NPM_REGISTRY                    ?= $(shell npm config get registry)
NPM                             := npm
DOCKER                          := docker
GIT                             := git
TAG                             ?= ${shell $(GIT) rev-parse --abbrev-ref HEAD}
PORT                            ?= 3000
IMAGE                           := $(NAME)
DOCKER_COMPOSE        					:= docker-compose -f docker-compose.yml
MODULES_TARGETS                 := build test image

node_modules: package.json ## install node_modules
	$(NPM) install --quiet --registry=$(NPM_REGISTRY)

build: node_modules ## build application
	$(NPM) run lint

image: build
	$(DOCKER) build --tag $(IMAGE):$(TAG) --build-arg port=$(PORT) .

start: build
	$(DOCKER_COMPOSE) run --user="root" --rm web -- ./initdb.sh
	NODE_ENV=development $(DOCKER_COMPOSE) up -d web

stop:
	$(DOCKER_COMPOSE) down --volumes --remove-orphans

test: start ## test application
	$(DOCKER_COMPOSE) run -e NODE_ENV=test --rm --entrypoint "/bin/bash -c" web_test "npm test"

.PHONY: $(MODULES_TARGETS) node_modules