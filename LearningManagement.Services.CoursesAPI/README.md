## Courses API (.NET 8)

A microservice that manages Courses and Enrollments. Designed with layered architecture and AutoMapper mappings.

### Quick Start

#### Prerequisites
- .NET SDK 8.0+

#### Run
```bash
dotnet restore
dotnet run
```
- The server will print its base URL.
- Swagger UI is available at `/swagger`.

#### Tests
```bash
dotnet test
```

### Configuration
- `appsettings.json` and `appsettings.Development.json` hold configuration (e.g., `AwsSettings`).
- For local runs, defaults are suitable; override via environment variables or user secrets as needed.

### Project Structure
- `Controllers/` — HTTP endpoints (e.g., `CoursesApiController`)
- `Services/` — Business logic (`CourseService`, `AwsService`)
- `Repositories/` — Data access (`CourseRepository`, `EnrollmentRepository` via `InMemoryDbContext`)
- `Models/`
  - Entities (`Course`, `Enrollment`, `Student`)
  - DTOs (`CourseDto`, `EnrollmentDto`, `EnrollmentReportDto`, `EnrollmentReportSummaryDto`, `StudentDto`)
  - Settings (`AwsSettings`)
- `Mapping/Profiles/` — AutoMapper profiles (Course, Enrollment, Student)
- `Exceptions/` — Rich domain exceptions (e.g., `CourseAlreadyExistsException`)
- `Data/` — `InMemoryDbContext`
- `Extensions/` — `LoggingExtensions`
- `Tests/` — Service-level tests

### Design Decisions
- **Layered architecture**: Controllers delegate to Services; Services abstract business logic; Repositories abstract persistence.
- **AutoMapper**: Centralized DTO mapping reduces controller noise and mapping drift.
- **Explicit exceptions**: Domain-specific exceptions make failure modes explicit and testable.
- **In-memory persistence**: Enables fast iteration and demo-readiness without external dependencies.

### Endpoints
- Courses CRUD
- Enrollments and reporting endpoints
- Swagger describes the full surface (self-documented via annotations/conventions)

### Trade-offs and Improvements
- **Identity in DTOs**: Currently exposed for simplicity. In production:
  - Do not expose IDs where identity should come from the token (e.g., student identity).
  - Derive the acting principal from a validated JWT and enforce authorization policies.
- **Students as a separate microservice**: Introduce a dedicated Students service with:
  - JWT auth and token issuance/validation
  - A gateway or service discovery layer
  - Contracts shared via OpenAPI and versioning strategy
- **Persistence**: Replace `InMemoryDbContext` with a relational DB + EF Core migrations.
- **Validation**: Add FluentValidation for DTOs and problem+json responses via a global exception handler.
- **Observability**: Serilog (structured logging), OpenTelemetry tracing, Prometheus metrics, CloudWatch aws.
- **Cloud integrations**: Harden `AwsService` with real credentials handling, retry policies, and timeouts.
- **Testing**: Add integration tests (WebApplicationFactory), contract tests, and repository tests against a test DB.

### Security Notes
- Enforce HTTPS only in production.
- Add JWT bearer authentication and authorization policies.
- Validate all inputs and restrict over-posting (DTOs with minimal fields).
