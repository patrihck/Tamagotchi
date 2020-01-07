NAME                            := tamagotchi-server
NPM_REGISTRY                    ?= $(shell npm config get registry)
NPM                             := npm
DOCKER                          := docker
GIT                             := git
TAG                             ?= ${shell $(GIT) rev-parse --abbrev-ref HEAD}
PORT                            ?= 3000
IMAGE                           := $(NAME)
MODULES_TARGETS                 := build test image

build: node_modules ## build application
	$(NPM) run lint

image: build ## build docker image (NOCACHE=1 to force rebuild)
	$(DOCKER) build --tag $(IMAGE):$(TAG) --build-arg port=$(PORT) .

node_modules: package.json ## install node_modules
	$(NPM) install --quiet --registry=$(NPM_REGISTRY)

test: ## test application
	$(NPM) run test

.PHONY: $(MODULES_TARGETS) node_modules