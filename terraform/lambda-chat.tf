locals {
  lambda_function_chat_name       = "AWSomeChat"
  lambda_function_chat_invoke_arn = "arn:aws:apigateway:${data.aws_region.this.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.this.name}:${local.account_id}:function:${local.lambda_function_chat_name}/invocations"
}

data "archive_file" "chat" {
  type        = "zip"
  source_dir  = "${path.module}/../app/backend/chat/bundle"
  output_path = "${path.module}/chat.zip"
}

resource "aws_lambda_function" "chat" {
  function_name    = local.lambda_function_chat_name
  role             = aws_iam_role.chat.arn
  filename         = data.archive_file.chat.output_path
  source_code_hash = data.archive_file.chat.output_base64sha256

  handler = "index.handler"
  runtime = "nodejs16.x"

  environment {
    variables = {
      APIGW_ENDPOINT   = "https://${aws_apigatewayv2_api.chat.id}.execute-api.${local.region}.amazonaws.com/prod"
      TABLE_NAME       = local.dynamodb_table_name
      LEX_BOT_ID       = var.lex_bot_id
      LEX_BOT_ALIAS_ID = var.lex_bot_alias_id
      LEX_LOCALE_ID    = var.lex_locale_id
    }
  }

  depends_on = [
    aws_cloudwatch_log_group.chat,
    aws_iam_role_policy_attachment.chat
  ]
}

resource "aws_lambda_permission" "chat" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.chat.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.chat.execution_arn}/*/*"
}