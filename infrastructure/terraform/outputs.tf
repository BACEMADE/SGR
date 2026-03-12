output "vpc_id" {
  value = aws_vpc.main.id
}

output "rds_endpoint" {
  value     = aws_db_instance.postgres.endpoint
  sensitive = true
}

output "ecr_repository_url" {
  value = aws_ecr_repository.backend.repository_url
}

output "alb_dns_name" {
  value = aws_lb.backend.dns_name
}

output "cloudfront_domain" {
  value = aws_cloudfront_distribution.frontend.domain_name
}

output "s3_bucket_name" {
  value = aws_s3_bucket.frontend.bucket
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.frontend.id
}
