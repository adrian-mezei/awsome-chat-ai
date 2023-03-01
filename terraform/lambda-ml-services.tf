locals {
  lambda_function_ml_services_name       = "MLServices"
  lambda_function_ml_services_invoke_arn = "arn:aws:apigateway:${data.aws_region.this.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.this.name}:${local.account_id}:function:${local.lambda_function_ml_services_name}/invocations"
}

data "archive_file" "ml_services" {
  type        = "zip"
  source_dir  = "${path.module}/../app/backend/ml-services/bundle"
  output_path = "${path.module}/ml-services.zip"
}

resource "aws_lambda_function" "ml_services" {
  function_name    = local.lambda_function_ml_services_name
  role             = aws_iam_role.ml_services.arn
  filename         = data.archive_file.ml_services.output_path
  source_code_hash = data.archive_file.ml_services.output_base64sha256
  timeout          = 15

  handler = "index.handler"
  runtime = "nodejs16.x"

  environment {
    variables = {
      S3_BUCKET = aws_s3_bucket.this.bucket
    }
  }

  depends_on = [
    aws_cloudwatch_log_group.ml_services,
    aws_iam_role_policy_attachment.ml_services
  ]
}

resource "aws_lambda_permission" "ml_services" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.ml_services.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.ml_services.execution_arn}/*/*"
}