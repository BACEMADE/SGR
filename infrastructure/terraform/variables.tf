variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
  default     = "sufra"
}

variable "db_username" {
  description = "Database master username"
  type        = string
  sensitive   = true
}

variable "db_password" {
  description = "Database master password"
  type        = string
  sensitive   = true
}

variable "db_name" {
  description = "Database name"
  type        = string
  default     = "sufra_db"
}

variable "jwt_secret" {
  description = "JWT signing secret"
  type        = string
  sensitive   = true
}

variable "backend_image" {
  description = "Docker image URI for the backend"
  type        = string
}

variable "backend_port" {
  description = "Port the backend container listens on"
  type        = number
  default     = 3000
}

variable "domain_name" {
  description = "Custom domain for CloudFront (optional)"
  type        = string
  default     = ""
}
