# Backend Service

This directory contains the backend service for our application, which is responsible for handling data operations, shortening URLs, and more.

## 🛠️ Setup & Installation

### Prerequisites

- Java 11+
- Maven
- An IDE like IntelliJ IDEA or Eclipse (optional)

### Installation

1. Navigate to the `backend` directory:

```bash
cd backend
```
2. Install the required dependencies using Maven:
```bash
cd mvn clean install
```

### 🔍 Running the Application
```bash
mvn spring-boot:run
```

The application should now be running and accessible at http://localhost:8080.

### 🧪 Running Unit Tests
To run the unit tests for the backend service:
```bash
mvn test
```

### 📝 Note
When deploying to a production environment, consider using a persistent database rather than H2, and ensure all endpoints are secure.




improvements
- click count
- timeout
- add caching
- scale db
- increase test coverage
