data "aws_iam_policy_document" "websocket_handler_assume_role_chat" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      identifiers = ["lambda.amazonaws.com"]
      type        = "Service"
    }
  }
}

data "aws_iam_policy_document" "websocket_handler_chat" {
  statement {
    sid = "AllowCloudWatch"
    actions = [
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]
    resources = ["${aws_cloudwatch_log_group.chat.arn}:*"]
  }

  statement {
    sid = "AllowDynamoDB"
    actions = [
      "dynamodb:DeleteItem", "dynamodb:Scan", "dynamodb:PutItem"
    ]
    resources = [aws_dynamodb_table.this.arn]
  }

  statement {
    sid       = "AllowApiGatewayManagementApi"
    effect    = "Allow"
    actions   = ["execute-api:ManageConnections"]
    resources = ["arn:aws:execute-api:${local.region}:${local.account_id}:${aws_apigatewayv2_api.chat.id}/prod/POST/*"]
  }

  statement {
    sid       = "AllowLex"
    effect    = "Allow"
    actions   = ["lex:RecognizeText"]
    resources = ["arn:aws:lex:${local.region}:${local.account_id}:bot-alias/${var.lex_bot_id}/${var.lex_bot_alias_id}"]
  }
}

resource "aws_iam_policy" "chat" {
  name   = "${local.lambda_function_chat_name}RolePolicy"
  policy = data.aws_iam_policy_document.websocket_handler_chat.json
}

resource "aws_iam_role" "chat" {
  name               = "${local.lambda_function_chat_name}Role"
  assume_role_policy = data.aws_iam_policy_document.websocket_handler_assume_role_chat.json
}

resource "aws_iam_role_policy_attachment" "chat" {
  policy_arn = aws_iam_policy.chat.arn
  role       = aws_iam_role.chat.name
}