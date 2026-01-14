---
description: Commit seguro con revision de secretos, mensaje descriptivo y versionado automatico (patch para fix, minor para feature)
allowed-tools: Bash(git:*), Bash(npm:*), Read, Write, Edit, Grep, Glob
---

# Commit Seguro con Versionado Automatico

## Contexto Actual

- Estado de git: !`git status --short`
- Cambios staged: !`git diff --staged --name-only`
- Cambios unstaged: !`git diff --name-only`
- Branch actual: !`git branch --show-current`
- Ultimos commits: !`git log --oneline -5 2>/dev/null || echo "No hay commits previos"`
- Version actual: !`node -p "require('./package.json').version" 2>/dev/null || echo "0.0.0"`

## Tu Tarea

Ejecuta un commit seguro siguiendo estos pasos **EN ORDEN**:

### 1. REVISION DE SEGURIDAD (OBLIGATORIO - NO SALTAR)

Antes de cualquier commit, DEBES verificar que NO se incluyan:

**Busca estos patrones en los archivos staged:**
```bash
git diff --staged
```

**Patrones PROHIBIDOS (bloquear commit si encuentras alguno):**
- API keys: `(api[_-]?key|apikey)\s*[:=]\s*['"][^'"]+['"]`
- Secrets: `(secret|password|passwd|pwd)\s*[:=]\s*['"][^'"]+['"]`
- Tokens: `(token|bearer|auth)\s*[:=]\s*['"][^'"]+['"]`
- AWS keys: `AKIA[0-9A-Z]{16}`
- Private keys: `-----BEGIN (RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----`
- Supabase keys reales: `eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+`
- URLs con credenciales: `://[^:]+:[^@]+@`
- .env con valores reales (no placeholders)

**Si encuentras CUALQUIER secreto:**
1. DETENER inmediatamente
2. Informar al usuario que archivo y linea contiene el secreto
3. NO proceder con el commit
4. Sugerir: anadir a .gitignore o usar variables de entorno

### 2. ANALISIS DE CAMBIOS

Si la revision de seguridad pasa, analiza los cambios:

- Que archivos se modificaron?
- Es un fix (bug fix, correccion) o una feature (nueva funcionalidad)?
- Hay breaking changes?

**Determinar tipo de cambio:**
- `fix`: Correccion de bugs, typos, errores
- `feat`: Nueva funcionalidad, nuevo componente, nueva feature
- `docs`: Solo documentacion
- `style`: Cambios de formato, no afectan logica
- `refactor`: Refactorizacion sin cambio de funcionalidad
- `chore`: Mantenimiento, dependencias, config

### 3. VERSIONADO AUTOMATICO

Segun el tipo de cambio, incrementar version en `package.json`:

| Tipo | Version | Ejemplo |
|------|---------|---------|
| `fix`, `docs`, `style`, `chore` | PATCH (0.0.X) | 0.1.0 -> 0.1.1 |
| `feat` | MINOR (0.X.0) | 0.1.1 -> 0.2.0 |
| Breaking change | MAJOR (X.0.0) | 0.2.0 -> 1.0.0 |

**Comando para incrementar:**
```bash
# Para patch
npm version patch --no-git-tag-version

# Para minor
npm version minor --no-git-tag-version

# Para major
npm version major --no-git-tag-version
```

### 4. GENERAR MENSAJE DE COMMIT

Formato: `<tipo>: <descripcion corta>`

**Reglas:**
- Maximo 72 caracteres en la primera linea
- Usar verbos en imperativo: "add", "fix", "update", "remove"
- Ser especifico pero conciso
- NO incluir "WIP", "temp", o mensajes vagos

**Ejemplos buenos:**
- `feat: add contact form with validation`
- `fix: resolve hydration error in Hero component`
- `style: improve card hover animations`
- `docs: update README with setup instructions`

**Ejemplos malos:**
- `update files` (muy vago)
- `fixed stuff` (no descriptivo)
- `WIP` (no commitear trabajo incompleto)

### 5. EJECUTAR COMMIT

```bash
# 1. Anadir cambios de version
git add package.json

# 2. Anadir otros cambios si no estan staged
git add -A  # o archivos especificos

# 3. Crear commit
git commit -m "<tipo>: <mensaje>"
```

### 6. RESUMEN FINAL

Despues del commit, mostrar:
- Hash del commit
- Mensaje del commit
- Nueva version
- Archivos incluidos

## IMPORTANTE

- NUNCA hagas commit si encuentras secretos
- SIEMPRE incrementa la version antes del commit
- SIEMPRE usa el formato de mensaje convencional
- Si hay dudas sobre el tipo, pregunta al usuario
