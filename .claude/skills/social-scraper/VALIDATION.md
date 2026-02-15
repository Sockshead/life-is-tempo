# JSON Schema Validation

## Overview

Configuration files (`config.json`, `inspiration-sources.json`) must be validated against their schemas before use to prevent runtime errors.

## Schema Files

- `schemas/config.schema.json` - Validates `config.json`
- `schemas/inspiration-sources.schema.json` - Validates `inspiration-sources.json`

## Validation Methods

### Option 1: Online Validators

Use [JSONSchemaValidator.net](https://www.jsonschemavalidator.net/):
1. Paste schema from `schemas/*.schema.json`
2. Paste your config JSON
3. Validate and fix errors

### Option 2: VS Code Extension

Install [JSON Schema Validator](https://marketplace.visualstudio.com/items?itemName=tberman.json-schema-validator):
1. Add `$schema` property to config files:
```json
{
  "$schema": "./schemas/config.schema.json",
  "own_accounts": { ... }
}
```
2. VS Code will show errors inline

### Option 3: Command Line (Node.js)

```bash
# Install ajv-cli
npm install -g ajv-cli

# Validate config
ajv validate -s schemas/config.schema.json -d config.json

# Validate inspiration sources
ajv validate -s schemas/inspiration-sources.schema.json -d inspiration-sources.json
```

### Option 4: Programmatic (Claude Skill Implementation)

Skills should validate configs when loaded:

```typescript
import Ajv from 'ajv'
import fs from 'fs'

function loadAndValidateConfig(configPath: string, schemaPath: string) {
  const ajv = new Ajv({ allErrors: true, verbose: true })

  // Load schema
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'))
  const validate = ajv.compile(schema)

  // Load and parse config
  let config
  try {
    config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
  } catch (error) {
    throw new Error(`Invalid JSON in ${configPath}: ${error.message}`)
  }

  // Validate
  if (!validate(config)) {
    const errors = validate.errors
      .map(e => `  - ${e.instancePath || 'root'}: ${e.message}`)
      .join('\n')
    throw new Error(`Config validation failed:\n${errors}`)
  }

  return config
}

// Usage
const config = loadAndValidateConfig(
  '.claude/skills/social-scraper/config.json',
  '.claude/skills/social-scraper/schemas/config.schema.json'
)
```

## Common Validation Errors

### Missing Required Fields

**Error**: `must have required property 'output'`

**Fix**: Add the missing required field:
```json
{
  "output": {
    "inspiration_dir": "content/inspiration",
    "analytics_dir": "content/analytics"
  }
}
```

### Wrong Type

**Error**: `must be array` (when field is string instead of array)

**Fix**: Convert to correct type:
```json
// Wrong
"accounts": "@ironman703"

// Correct
"accounts": ["@ironman703"]
```

### Pattern Mismatch

**Error**: `must match pattern "^@[a-zA-Z0-9._]+$"`

**Fix**: Ensure username starts with @:
```json
// Wrong
"threads": "ultra.choko"

// Correct
"threads": "@ultra.choko"
```

### Out of Range

**Error**: `must be >= 1000` (for delay_between_requests_ms)

**Fix**: Use minimum value:
```json
// Wrong
"delay_between_requests_ms": 500

// Correct
"delay_between_requests_ms": 1000
```

### Typos in Property Names

**Error**: `must NOT have additional properties` when `additionalProperties: false`

**Fix**: Check for typos:
```json
// Wrong
"inspration_sources": { ... }  // typo: missing 'i'

// Correct
"inspiration_sources": { ... }
```

## Benefits

✅ **Catch errors before runtime** - Validation fails fast with clear messages
✅ **Self-documenting** - Schema describes expected structure and constraints
✅ **IntelliSense support** - IDEs can autocomplete based on schema
✅ **Prevent typos** - `additionalProperties: false` catches property name typos
✅ **Type safety** - Ensures correct data types (array vs string, etc.)

## Recommendations

1. **Always validate after editing** - Run validation before committing config changes
2. **Use VS Code extension** - Get immediate feedback while editing
3. **Add to CI/CD** - Validate configs in pre-commit hooks or GitHub Actions
4. **Document schema** - Update schemas when adding new config fields
