output "api_gateway_urls" {
  value = {
    chat = "${aws_apigatewayv2_api.chat.api_endpoint}/prod"
    ml_services = "${aws_apigatewayv2_api.ml_services.api_endpoint}/prod"
  }
}

output "bucket_url" {
  value = "http://${aws_s3_bucket.this.bucket}.s3-website.${local.region}.amazonaws.com"
}

output "account_id" {
  value = data.aws_caller_identity.this.account_id
}