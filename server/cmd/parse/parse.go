package main

import (
	"context"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/jpenton/gitgud-team-stats/server/internal/gitgud"
	jsoniter "github.com/json-iterator/go"
)

// Response is of type APIGatewayProxyResponse since we're leveraging the
// AWS Lambda Proxy Request functionality (default behavior)
//
// https://serverless.com/framework/docs/providers/aws/events/apigateway/#lambda-proxy-integration
type Response events.APIGatewayProxyResponse

// Handler is our lambda handler invoked by the `lambda.Start` function call
func Handler(ctx context.Context) (Response, error) {
	var json = jsoniter.ConfigCompatibleWithStandardLibrary

	err := gitgud.ParseRegions()

	if err != nil {
		return Response{
			StatusCode: http.StatusBadRequest,
		}, err
	}

	body, err := json.Marshal("OK")

	if err != nil {
		return Response{StatusCode: http.StatusBadRequest}, err
	}

	resp := Response{
		StatusCode:      http.StatusOK,
		IsBase64Encoded: false,
		Body:            string(body),
		Headers: map[string]string{
			"Content-Type":           "application/json",
			"X-MyCompany-Func-Reply": "hello-handler",
		},
	}

	return resp, nil
}

func main() {
	lambda.Start(Handler)
}
