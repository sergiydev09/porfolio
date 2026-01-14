---
name: secure-commit
description: Analiza cambios de git para detectar secretos, API keys, tokens y credenciales antes de hacer commit.
allowed-tools: Bash(git:*), Read, Grep
---

# Secure Commit Skill

Esta skill analiza los cambios staged en git para detectar secretos y credenciales que NO deben ser commiteados a un repositorio publico.

## Uso

Esta skill se activa automaticamente con el comando `/commit` o cuando detecta que el usuario quiere hacer un commit.

## Patrones de Deteccion

### CRITICO - Bloquear siempre

| Patron | Descripcion |
|--------|-------------|
| `-----BEGIN.*PRIVATE KEY-----` | Claves privadas RSA/EC/DSA |
| `AKIA[0-9A-Z]{16}` | AWS Access Key ID |
| `ghp_[a-zA-Z0-9]{36}` | GitHub Personal Access Token |
| `github_pat_` | GitHub PAT (nuevo formato) |
| `sk_live_` | Stripe Live Secret Key |
| `eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+` | JWT Token |

### ALTO - Revisar manualmente

| Patron | Descripcion |
|--------|-------------|
| `api[_-]?key.*=.*['"][^'"]{20,}['"]` | API Keys genericas |
| `password.*=.*['"][^'"]+['"]` | Passwords en codigo |
| `(secret|token).*=.*['"][^'"]+['"]` | Secrets/Tokens genericos |

### MEDIO - Advertir

| Patron | Descripcion |
|--------|-------------|
| `://[^:]+:[^@]+@` | URLs con credenciales |
| `postgres://.*:.*@` | Connection strings PostgreSQL |
| `mongodb://.*:.*@` | Connection strings MongoDB |

## Acciones

### Si se detectan secretos:

1. **BLOQUEAR** el commit
2. Informar al usuario:
   - Que archivo contiene el secreto
   - Que tipo de secreto parece ser
   - Linea aproximada
3. Sugerir soluciones:
   - Mover a `.env` (que esta en .gitignore)
   - Usar variables de entorno
   - Usar un gestor de secretos

### Si NO se detectan secretos:

Proceder con el commit normalmente.

## Falsos Positivos

Algunos patrones pueden dar falsos positivos:
- Ejemplos en documentacion con valores placeholder
- Tests con datos mock
- URLs de ejemplo

En estos casos, verificar manualmente si el valor es real o placeholder.
