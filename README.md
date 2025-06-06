# Bank Test API

This project is a Node.js API built with **Express** and **Sequelize** to interact with a MySQL database. The API is designed to manage data related to vehicles, users, brands, and more. It uses Docker Compose to run the backend and the MySQL database in parallel containers.

## Features

- RESTful API built with **Express**.
- Database interaction using **Sequelize ORM**.
- MySQL database running in a Docker container.
- Environment-based configuration using a `.env` file.

## Prerequisites

- [Docker](https://www.docker.com/) installed on your system.
- [Node.js](https://nodejs.org/) (if you want to run the app outside Docker).

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/chahrlens/bank_test_api.git
   cd bank_test_api
   ```
2. Copy the example environment file and update it with your configuration:
   ```bash
   cp .env.example .env
   ```
3. Update the `.env` file with your database and application settings:
   ```env
   DB_HOST=mysql
   DB_USER=master
   DB_PASSWORD=asdf.124
   DB_NAME=bank_test
   DB_PORT=3306
   DB_DIALECT=mysql
   DB_POOL_MAX=5
   DB_POOL_MIN=0
   EXPOSE_PORT=3000
   ENABLE_LOGGING=true
   DB_ACQUIRING_TIMEOUT=30000
   DB_IDLE_TIMEOUT=10000
   JWT_SECRET=supersecretkey
   JWT_EXPIRATION=3600
   BUILD_VERSION=1.0.0
   ```
4. Build and run the Docker containers for the first time:
   ```bash
   docker-compose up --build
   ```
   This will build the images and start the containers.

5. For subsequent runs, you can start the containers in detached mode:
   ```bash
   docker-compose up -d
   ```

6. Access the API health-check at `http://localhost:3000/health-check`.

## Authentication

The API uses JSON Web Tokens (JWT) for authentication. To access protected resources, you need to include a valid JWT in the `Authorization` header of your requests:

```
Authorization: Bearer <your_token>
```

## Error Handling

The API follows a standard error response format:

- `status`: HTTP status code.
- `message`: Error message.
- `data`: Additional error data (optional).

Example:

```json
{
  "status": 404,
  "message": "Resource not found",
  "data": null
}
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Make your changes.
4. Commit your changes: `git commit -m 'Add your feature'`.
5. Push to the branch: `git push origin feature/your-feature`.
6. Create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
