.PHONY: build clean deploy

build:
	env GOOS=linux go build -ldflags="-s -w" -o bin/parse cmd/parse/parse.go

clean:
	rm -rf ./bin

deploy: clean build
	sls deploy --verbose

dev: clean build
	sam local start-api
