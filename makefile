.PHONY: all deploy build
all:
	${MAKE} build-img deploy

build:
	docker build -t abhi9686/food-order-ui .

push:
	docker push abhi9686/food-order-ui:latest
	
deploy:

	helm upgrade --install food-order-ui ./deploy/food-order-ui -n food-order --create-namespace