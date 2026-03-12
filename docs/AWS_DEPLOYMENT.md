# Sufra — AWS Deployment Guide

## Architecture Overview

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  CloudFront  │────▶│  S3 (Frontend)│     │             │
│  (CDN)       │     └──────────────┘     │  RDS         │
│              │                           │  PostgreSQL  │
│  /api/* ─────│────▶┌──────────────┐     │             │
│              │     │  ALB          │────▶│             │
└─────────────┘     │              │     └─────────────┘
                     └──────┬───────┘
                            │
                     ┌──────▼───────┐
                     │  ECS Fargate  │
                     │  (Backend)    │
                     └──────────────┘
```

## Prerequisites

- AWS CLI configured with appropriate credentials
- Terraform >= 1.5.0
- Docker
- Node.js >= 20

## Step 1: Terraform State Backend

Create an S3 bucket and DynamoDB table for Terraform state:

```bash
aws s3 mb s3://sufra-terraform-state --region us-east-1
aws dynamodb create-table \
  --table-name sufra-terraform-locks \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region us-east-1
```

## Step 2: Configure Variables

```bash
cd infrastructure/terraform
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your values (strong passwords!)
```

## Step 3: Deploy Infrastructure

```bash
terraform init
terraform plan
terraform apply
```

Note the outputs: `ecr_repository_url`, `cloudfront_domain`, `s3_bucket_name`, `cloudfront_distribution_id`.

## Step 4: Build & Push Backend Docker Image

```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <ECR_REPO_URL>

# Build and push
cd backend
docker build -t sufra-backend .
docker tag sufra-backend:latest <ECR_REPO_URL>:latest
docker push <ECR_REPO_URL>:latest
```

## Step 5: Deploy Frontend

```bash
# Build frontend
npm run build

# Upload to S3
aws s3 sync dist/ s3://<S3_BUCKET_NAME> --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id <CLOUDFRONT_DISTRIBUTION_ID> \
  --paths "/*"
```

## Step 6: Run Database Migrations

The backend runs migrations automatically on startup. You can also run them manually:

```bash
# Via ECS exec
aws ecs execute-command \
  --cluster sufra-cluster \
  --task <TASK_ID> \
  --container backend \
  --interactive \
  --command "node dist/db/migrate.js"
```

## Local Development

```bash
# Start everything with Docker Compose
docker-compose up

# Frontend: http://localhost:8080
# Backend:  http://localhost:3000
# Postgres: localhost:5432
```

## Frontend Migration Notes

The file `src/lib/api-client.ts` is a drop-in API client for the AWS backend.
To fully migrate the frontend:

1. Set `VITE_API_BASE_URL=http://localhost:3000` in your local `.env`
2. Replace `AuthContext.tsx` imports from Supabase to use `apiClient` from `src/lib/api-client.ts`
3. In production (CloudFront), set `VITE_API_BASE_URL=""` — the `/api/*` path is proxied to the ALB

## Environment Variables

### Backend (.env)
| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 3000) |
| `DB_HOST` | PostgreSQL host |
| `DB_PORT` | PostgreSQL port (default: 5432) |
| `DB_NAME` | Database name |
| `DB_USER` | Database user |
| `DB_PASSWORD` | Database password |
| `JWT_SECRET` | JWT signing secret (min 64 chars) |
| `JWT_EXPIRES_IN` | Token expiry (default: 7d) |
| `CORS_ORIGIN` | Allowed CORS origin |

### Frontend (.env)
| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | Backend API URL (empty for same-origin in prod) |

## Security Checklist

- [ ] Strong `DB_PASSWORD` (32+ chars, mixed case, numbers, symbols)
- [ ] Strong `JWT_SECRET` (64+ random chars)
- [ ] Enable HTTPS on ALB with ACM certificate
- [ ] Enable RDS encryption at rest (enabled by default in Terraform)
- [ ] Enable CloudFront HTTPS-only (enabled by default)
- [ ] Review security groups — RDS only accessible from ECS
- [ ] Enable deletion protection on RDS (enabled by default)
- [ ] Set up CloudWatch alarms for ECS and RDS
