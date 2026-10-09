# Database-Systems-II-Group-Project

[![CI](https://github.com/cyberkitty418/Database-Systems-II-Semester-Project/actions/workflows/ci.yml/badge.svg?branch=dev)](https://github.com/cyberkitty418/Database-Systems-II-Semester-Project/actions/workflows/ci.yml)

Semester project for the Database Systems II course at CTU FEL.
A Spring Boot application working with MongoDB, Cassandra and Neo4j.

## Local development environment

The project uses three databases (MongoDB, Cassandra, Neo4j), which run locally in Docker.

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (running)
- Java 21

### First-time setup

Copy the example environment file and set a Neo4j password (at least 8 characters):

```bash
cp .env.example .env
```

### Start the databases

```bash
docker compose up -d
```

The first start downloads the images and may take a few minutes.
Cassandra needs about 1–2 minutes to become ready. Check the status with:

```bash
docker compose ps -a
```

`mongodb`, `neo4j` and `cassandra` (healthy) should be running.
`cassandra-init` should be `Exited (0)` – it only creates the keyspace and stops.

### Start the application

Run `DatabasesystemsApplication` from the IDE, or:

```bash
./mvnw spring-boot:run
```

### Stop the databases

```bash
docker compose down        # stop, data is kept
docker compose down -v     # stop and delete all data
```

### Ports

| Service              | Address                 |
|----------------------|-------------------------|
| MongoDB              | `localhost:27017`       |
| Cassandra            | `localhost:9042`        |
| Neo4j (Bolt)         | `localhost:7687`        |
| Neo4j Browser        | http://localhost:7474   |

### Troubleshooting

- **`port is already allocated`** – another database is already running on that port. Stop it or change the left port in `compose.yaml`.
- **`NEO4J_PASSWORD variable is not set`** – the `.env` file is missing in the project root.
- **Application fails to connect to Cassandra** – Cassandra is not ready yet. Wait until it is `healthy` and restart the application.