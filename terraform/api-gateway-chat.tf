resource "aws_apigatewayv2_api" "chat" {
  name          = "AWSomeChat-Chat"
  protocol_type = "WEBSOCKET"
  route_selection_expression = "$request.body.action"
}

resource "aws_apigatewayv2_integration" "chat" {
  api_id           = aws_apigatewayv2_api.chat.id
  integration_type = "AWS_PROXY"
  integration_method = "POST"
  integration_uri = local.lambda_function_chat_invoke_arn
  passthrough_behavior = "WHEN_NO_MATCH"
  content_handling_strategy = "CONVERT_TO_TEXT"
}

resource "aws_apigatewayv2_route" "connect" {
  api_id    = aws_apigatewayv2_api.chat.id
  route_key = "$connect"
  target = "integrations/${aws_apigatewayv2_integration.chat.id}"
}

resource "aws_apigatewayv2_route" "disconnect" {
  api_id    = aws_apigatewayv2_api.chat.id
  route_key = "$disconnect"
  target = "integrations/${aws_apigatewayv2_integration.chat.id}"
}

resource "aws_apigatewayv2_route" "default" {
  api_id    = aws_apigatewayv2_api.chat.id
  route_key = "$default"
  target = "integrations/${aws_apigatewayv2_integration.chat.id}"
}

resource "aws_apigatewayv2_stage" "chat" {
  api_id = aws_apigatewayv2_api.chat.id
  name   = "prod"
  deployment_id = aws_apigatewayv2_deployment.chat.id
}

resource "aws_apigatewayv2_deployment" "chat" {
  api_id = aws_apigatewayv2_api.chat.id

  lifecycle {
    create_before_destroy = true
  }

  triggers = {
    redeployment = sha256(jsonencode([
      aws_apigatewayv2_integration.chat,

      aws_apigatewayv2_route.connect,
      aws_apigatewayv2_route.disconnect,
      aws_apigatewayv2_route.default,
    ]))
  }
}