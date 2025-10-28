## Learning Management

This repository contains:
- `LearningManagement.Services.CoursesAPI`: .NET 8 Web API microservice for Courses and Enrollments
- `LearningManagement.FrontEnd`: React + Vite + TypeScript single-page app

### Tech Stack
- **Backend**: .NET 8, ASP.NET Core, AutoMapper, xUnit
- **Frontend**: React, Vite, TypeScript, Axios, custom theming and UI providers
- **Data**: In-memory DB for local development

### Local Setup

#### Prerequisites
- .NET SDK 8.0+
- Node.js 18+ (20+ recommended) and npm

#### Backend (API)
1. Open the solution `CoursesAPI.sln` in Visual Studio and run the `LearningManagement.Services.CoursesAPI` project, or from CLI open a terminal at `LearningManagement.Services.CoursesAPI` and run:
   ```bash
   dotnet restore
   dotnet run
   ```
2. The API will start and print its base URL (Swagger is available at `/swagger`).

#### Frontend (Web App)
1. Open a terminal at `LearningManagement.FrontEnd`
2. A `.env` file is already included for the assignment. Verify it points to your backend:
   ```bash
   VITE_BASE_API_URL_COURSE=https://localhost:7000/api/courses
   ```
3. Install and start:
   ```bash
   npm install
   npm run dev
   ```
4. Open the printed local URL (usually `http://localhost:5173`).

### Architecture Overview

- **Backend**:
  - `Controllers/`: HTTP endpoints
  - `Services/`: Business logic (course and AWS-related operations)
  - `Repositories/`: Data access (in-memory)
  - `Mapping/Profiles/`: AutoMapper object mappings
  - `Models/`: Entities and DTOs
  - `Exceptions/`: Domain-specific exceptions
  - `Data/`: InMemoryDbContext
  - `Extensions/`: Logging extensions and helpers
  - `Tests/`: Unit tests for core service logic
- **Frontend**:
  - `domains/`: Feature domains (courses, client)
  - `domains/*/services`: API service wrappers (Axios)
  - `domains/*/hooks`: Reusable data hooks
  - `shared/components/ui/Theme`: App-wide theming and UI primitives
  - `app/providers`: Cross-cutting providers (Dialog, Loading, Toast)
  - `routes/`: Routing configuration

### Design Decisions
- **Separation of concerns** with Controllers → Services → Repositories and explicit DTO mapping.
- **In-memory store** for simplicity and fast local development.
- **domain driven architecture frontend** on the frontend to keep components, hooks, and services close.
- **Provider-based UX** (loading, dialogs, toasts) for consistent user feedback patterns.

### Trade-offs and Areas for Improvement
- **IDs in DTOs**: Exposed for simplicity. In a production setup, identities should be derived from tokens; IDs wouldn’t be client-controlled.
- **Auth and Students**: In production, Students would be a separate microservice with a proper auth system (JWT), and the Courses API would infer student identity from the token.
- **Persistence**: Replace in-memory DB with a real database (SQL Server), add migrations.
- **Observability**: Centralized logging (Serilog), metrics and tracing (OpenTelemetry) and cloudwatch for aws.
- **Security**: JWT validation, authorization policies, rate limiting, CORS hardening.
- **DX**: Docker Compose for local orchestration; CI/CD with build, tests, and linting gates.


<img width="1902" height="932" alt="image" src="https://github.com/user-attachments/assets/ac02928a-7a08-4c95-85e1-44b0e0821cd7" />
<img width="1895" height="928" alt="image" src="https://github.com/user-attachments/assets/67113768-4450-4322-91cc-df845fcc2d5b" />
<img width="584" height="831" alt="image" src="https://github.com/user-attachments/assets/fb253110-5eca-4769-9352-31e4a8dac4b9" />
<img width="1905" height="926" alt="image" src="https://github.com/user-attachments/assets/c956468b-6686-46c2-9365-3337e0f7ff33" />
<img width="1903" height="872" alt="image" src="https://github.com/user-attachments/assets/c8811d35-3c90-4ff6-8a97-3b551ab64c26" />
<img width="576" height="832" alt="image" src="https://github.com/user-attachments/assets/93546908-47ee-4738-ad09-bc2f3a052457" />
<img width="1907" height="866" alt="image" src="https://github.com/user-attachments/assets/e1f812d6-45c4-48bb-b4d9-dcac35d9368f" />

