resource "aws_cloudwatch_log_group" "chat" {
  name              = "/aws/lambda/${local.lambda_function_chat_name}"
  retention_in_days = 3
}

resource "aws_cloudwatch_log_group" "ml_services" {
  name              = "/aws/lambda/${local.lambda_function_ml_services_name}"
  retention_in_days = 3
}