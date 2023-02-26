data "aws_iam_policy_document" "lambda_handler_assume_role_ml_services" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      identifiers = ["lambda.amazonaws.com"]
      type        = "Service"
    }
  }
}

data "aws_iam_policy_document" "lambda_handler_ml_services" {
  statement {
    sid = "CloudWatchLogging"
    actions = [
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]
    resources = ["${aws_cloudwatch_log_group.ml_services.arn}:*"]
  }

  statement {
    sid     = "PollyAccess"
    actions = [
      "polly:SynthesizeSpeech"
    ]
    resources = ["*"]
  }

  statement {
    sid     = "AudioFileUploadToS3"
    actions = [
      "s3:PutObject",
      "s3:PutObjectAcl"
    ]
    resources = ["${aws_s3_bucket.this.arn}/audio/*"]
  }

  statement {
    sid     = "ComprehendAccess"
    actions = [
      "comprehend:DetectDominantLanguage",
      "comprehend:DetectSentiment"
    ]
    resources = ["*"]
  }

  statement {
    sid     = "TranslateAccess"
    actions = [
      "translate:TranslateText"
    ]
    resources = ["*"]
  }
}

resource "aws_iam_policy" "ml_services" {
  name = "${local.lambda_function_ml_services_name}RolePolicy"
  policy = data.aws_iam_policy_document.lambda_handler_ml_services.json
}

resource "aws_iam_role" "ml_services" {
  name = "${local.lambda_function_ml_services_name}Role"
  assume_role_policy = data.aws_iam_policy_document.lambda_handler_assume_role_ml_services.json
}

resource "aws_iam_role_policy_attachment" "ml_services" {
  policy_arn = aws_iam_policy.ml_services.arn
  role       = aws_iam_role.ml_services.name
}