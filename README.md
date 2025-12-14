# Phishing Simulation Platform

Full-stack application built with Docker, NestJS, React, and MongoDB.

## Structure

```
phishing-test
├── management-backend  # Management Server (NestJS)
├── phishing-backend    # Phishing Simulation Server (NestJS)
├── frontend            # Frontend (React)
└── docker-compose.yml
```

## Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ElenPanoyan/phishing-test.git
   cd https://github.com/ElenPanoyan/phishing-test
   ```

2. **Setup environment files**:
   Copy `.env.example` to `.env` for each service:

   ```bash
   cd management-backend && cp .env.example .env && cd ..
   cd phishing-backend && cp .env.example .env && cd ..
   cd frontend && cp .env.example .env && cd ..
   ```

3. **Run with Docker**:

   ```bash
   docker-compose up -d
   ```

4. **Access**:

   - Frontend: http://localhost:3000
   - Management API: http://localhost:8787/docs
   - Phishing API: http://localhost:8788/docs

5. **Stop**:
   ```bash
   docker-compose down
   ```
# phishing-test
# cymulate-new-double-BC
