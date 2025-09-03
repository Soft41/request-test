# Request Management Service

## Technology

- **Node.js & NestJS**.
- **PostgreSQL & TypeORM**
- **RabbitMQ**
- **Redis**
- **Jest**

---

## Functional

1. **REST API**:
    - `POST /requests` – add new request with status `NEW`.
    - `GET /requests` – get all requests (pagination)

2. **Background status change**:
    - Each new request is added to the RabbitMQ queue.
    - Worker (consumer) sequentially changes status:
     ```
     NEW -> after 5 sec -> IN_PROGRESS -> after 5 sec -> DONE
     ```

3. **Caching**:
   - TTL 60 seconds

---

## Start

```bash
git clone url
npm install
docker-compose up
npm run start:dev
