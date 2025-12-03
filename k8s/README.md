# Kubernetes Deployment Infrastructure

This directory contains the Kubernetes deployment infrastructure for the Disney AI Plus application, implementing the deployment architecture specified in the [deployment diagram](../docs/diagrams/v3-test/deployment.md).

## Architecture Overview

The deployment consists of three main components within a Kubernetes cluster:

```
┌─────────────────────────────────────────────────────────────┐
│                      Cloud Region                           │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                  Kubernetes Cluster                    │  │
│  │                                                        │  │
│  │   ┌─────────────────┐     ┌─────────────────┐         │  │
│  │   │    Web Pod      │────▶│    API Pod      │         │  │
│  │   │  (Next.js App)  │     │  (Node.js API)  │         │  │
│  │   └─────────────────┘     └────────┬────────┘         │  │
│  │                                    │                   │  │
│  └────────────────────────────────────┼───────────────────┘  │
│                                       │                      │
│                                       ▼                      │
│                            ┌─────────────────┐               │
│                            │    Database     │               │
│                            │  (PostgreSQL)   │               │
│                            └─────────────────┘               │
└─────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
k8s/
├── base/                           # Base Kubernetes manifests
│   ├── kustomization.yaml          # Kustomize configuration
│   ├── namespace.yaml              # Namespace definition
│   ├── service-accounts.yaml       # Service accounts for pods
│   ├── api-deployment.yaml         # API Pod deployment
│   ├── api-service.yaml            # API Pod service
│   ├── api-configmap.yaml          # API configuration
│   ├── api-secrets.yaml            # API secrets (template)
│   ├── api-network-policy.yaml     # API network policy
│   ├── web-deployment.yaml         # Web Pod deployment
│   ├── web-service.yaml            # Web Pod service
│   ├── web-configmap.yaml          # Web configuration
│   ├── web-secrets.yaml            # Web secrets (template)
│   ├── web-network-policy.yaml     # Web network policy
│   ├── db-statefulset.yaml         # Database StatefulSet
│   ├── db-service.yaml             # Database service
│   ├── db-secrets.yaml             # Database secrets (template)
│   ├── db-network-policy.yaml      # Database network policy
│   ├── ingress.yaml                # Ingress configuration
│   ├── hpa.yaml                    # Horizontal Pod Autoscalers
│   ├── pdb.yaml                    # Pod Disruption Budgets
│   └── service-monitors.yaml       # Prometheus ServiceMonitors
└── overlays/
    ├── production/                 # Production-specific config
    │   └── kustomization.yaml
    └── staging/                    # Staging-specific config
        └── kustomization.yaml
```

## Components

### API Pod
- **Purpose**: Handles HTTP API requests for the application
- **Features**:
  - Horizontal Pod Autoscaling (2-10 replicas)
  - Liveness and readiness probes
  - Resource limits and requests
  - Prometheus metrics endpoint
  - Network policy for secure communication

### Web Pod
- **Purpose**: Serves the Next.js frontend application
- **Features**:
  - Horizontal Pod Autoscaling (2-10 replicas)
  - Liveness and readiness probes
  - Resource limits and requests
  - Prometheus metrics endpoint
  - Network policy for secure communication

### Database Node
- **Purpose**: PostgreSQL database for persistent storage
- **Features**:
  - StatefulSet deployment for data persistence
  - Persistent Volume Claim (10Gi default)
  - PostgreSQL Exporter for Prometheus metrics
  - Network policy restricting access to API pods only
  - Health checks via pg_isready

## Non-Functional Requirements

### Performance
- API latency target: < 200ms
- Support for 5,000 concurrent users
- Horizontal Pod Autoscaling based on CPU/memory utilization
- Resource requests and limits configured for optimal performance

### Security
- TLS 1.3 encryption via Ingress (cert-manager integration)
- Network policies restricting pod-to-pod communication
- Service accounts with minimal permissions
- Secrets management (template provided, use sealed-secrets in production)
- Non-root container execution
- Read-only root filesystem where possible

### Observability
- Prometheus metrics endpoints on all components
- ServiceMonitors for automatic metric collection
- PostgreSQL Exporter for database metrics
- Centralized logging support via container stdout/stderr

### Resilience
- Pod Disruption Budgets ensuring availability during updates
- Liveness and readiness probes for automatic recovery
- Multiple replicas for API and Web pods
- Graceful scaling behavior with HPA

## Deployment

### Prerequisites
- Kubernetes cluster (1.25+)
- kubectl configured
- kustomize (or kubectl with kustomize support)
- Ingress controller (nginx-ingress recommended)
- cert-manager (for TLS certificates)
- Prometheus Operator (for ServiceMonitors)

### Deploy to Staging
```bash
kubectl apply -k k8s/overlays/staging
```

### Deploy to Production
```bash
kubectl apply -k k8s/overlays/production
```

### Verify Deployment
```bash
# Check pods
kubectl get pods -n disney-ai-plus

# Check services
kubectl get svc -n disney-ai-plus

# Check ingress
kubectl get ingress -n disney-ai-plus

# Check HPA status
kubectl get hpa -n disney-ai-plus
```

## Configuration

### Environment Variables

#### API Pod
| Variable | Description |
|----------|-------------|
| `NODE_ENV` | Environment (production/staging) |
| `PORT` | API server port |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | JWT signing secret |
| `SUPABASE_URL` | Supabase API URL |
| `SUPABASE_ANON_KEY` | Supabase anonymous key |

#### Web Pod
| Variable | Description |
|----------|-------------|
| `NODE_ENV` | Environment (production/staging) |
| `PORT` | Next.js server port |
| `API_URL` | Internal API URL |
| `NEXT_PUBLIC_SUPABASE_URL` | Public Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public Supabase key |

### Secret Management

The secret files in this repository contain placeholder values. For production deployments:

1. **Sealed Secrets**: Use [sealed-secrets](https://github.com/bitnami-labs/sealed-secrets) to encrypt secrets
2. **External Secrets Operator**: Use [external-secrets](https://external-secrets.io/) to sync secrets from external providers (AWS Secrets Manager, HashiCorp Vault, etc.)

## Monitoring

### Prometheus Metrics

All components expose Prometheus metrics:

| Component | Port | Path |
|-----------|------|------|
| API | 3001 | /metrics |
| Web | 3000 | /metrics |
| Database | 9187 | /metrics |

### Alerting

Configure Prometheus AlertManager rules for:
- High error rates
- High latency
- Pod restarts
- Resource utilization thresholds
- Database connection issues

## Scaling

### Manual Scaling
```bash
# Scale API deployment
kubectl scale deployment api --replicas=5 -n disney-ai-plus

# Scale Web deployment
kubectl scale deployment web --replicas=5 -n disney-ai-plus
```

### Automatic Scaling
HPA is configured to automatically scale based on:
- CPU utilization (target: 70%)
- Memory utilization (target: 80%)

Production configuration:
- API: 3-20 replicas
- Web: 3-20 replicas

Staging configuration:
- API: 1-3 replicas
- Web: 1-3 replicas

## Troubleshooting

### Check pod logs
```bash
kubectl logs -f deployment/api -n disney-ai-plus
kubectl logs -f deployment/web -n disney-ai-plus
kubectl logs -f statefulset/db -n disney-ai-plus
```

### Check pod events
```bash
kubectl describe pod <pod-name> -n disney-ai-plus
```

### Check network policies
```bash
kubectl get networkpolicy -n disney-ai-plus
```

### Database connection test
```bash
kubectl exec -it db-0 -n disney-ai-plus -- pg_isready -U disney_app
```
