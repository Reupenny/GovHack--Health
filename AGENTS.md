# Agent Guidelines for GovHack Health Project

## Package Manager
- **ALWAYS use bun instead of npm** for all commands
- Install dependencies with `bun install`
- Run scripts with `bun run <script>`

## Build/Lint/Test Commands
```bash
# For each service (central_api and DHB):
cd phase_1/central_api    # or phase_1/DHB
bun install              # Install dependencies  
bun run build            # TypeScript compilation
bun run dev             # Development server with watch mode
bun start               # Production server
```

## Docker & Deployment
- Use bun in Dockerfiles instead of npm
- Install bun globally in containers: `npm install -g bun`

## Code Style Guidelines

### TypeScript & Module System
- Use ESNext target with NodeNext modules
- Enable strict mode with verbatimModuleSyntax
- Use ES modules with `.js` imports for local files
- Export interfaces from separate types files

### Imports & Structure
- Group imports: external packages first, then local files
- Use interface imports with `type` keyword
- Follow `src/` structure with separate concerns (routes, middleware, types)

### API Development (Hono Framework)
- Use Hono for HTTP servers with middleware pattern
- Structure: app.use() for middleware, app.route() for routing
- Return JSON responses with proper HTTP status codes
- Handle errors with try/catch and structured error responses

### Error Handling
- Use structured error responses with `error`, `message` fields
- Include timestamps in error responses
- Use specific error codes (NOT_FOUND, INVALID_REQUEST, etc.)

### Code Conventions
- Use camelCase for variables/functions, PascalCase for interfaces
- Prefer async/await over Promises
- Use const for immutable values, proper typing for parameters
- Add JSDoc comments only when requested explicitly