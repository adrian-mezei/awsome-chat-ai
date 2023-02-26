resource "aws_apigatewayv2_api" "ml_services" {
  name          = "AWSomeChat-MLServices"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "ml_services" {
  api_id           = aws_apigatewayv2_api.ml_services.id
  integration_type = "AWS_PROXY"
  integration_method = "POST"
  integration_uri = local.lambda_function_ml_services_invoke_arn
}

resource "aws_apigatewayv2_route" "translate" {
  api_id    = aws_apigatewayv2_api.ml_services.id
  route_key = "POST /translate"
  target = "integrations/${aws_apigatewayv2_integration.ml_services.id}"
}

resource "aws_apigatewayv2_route" "comprehend" {
  api_id    = aws_apigatewayv2_api.ml_services.id
  route_key = "POST /comprehend"
  target = "integrations/${aws_apigatewayv2_integration.ml_services.id}"
}

resource "aws_apigatewayv2_route" "polly" {
  api_id    = aws_apigatewayv2_api.ml_services.id
  route_key = "POST /polly"
  target = "integrations/${aws_apigatewayv2_integration.ml_services.id}"
}

resource "aws_apigatewayv2_stage" "ml_services" {
  api_id = aws_apigatewayv2_api.ml_services.id
  name   = "prod"
  deployment_id = aws_apigatewayv2_deployment.ml_services.id
}

resource "aws_apigatewayv2_deployment" "ml_services" {
  api_id = aws_apigatewayv2_api.ml_services.id

  lifecycle {
    create_before_destroy = true
  }

  triggers = {
    redeployment = sha256(jsonencode([
      aws_apigatewayv2_integration.ml_services,

      aws_apigatewayv2_route.comprehend,
      aws_apigatewayv2_route.translate,
      aws_apigatewayv2_route.polly,
    ]))
  }
}