# URL Shortener Service

This project is a URL shortening service, akin to services like Bit.ly or TinyURL. Users input a lengthy URL, and they're presented with a condensed version which, when visited, redirects them to the initial URL.

## 🛠 Development Stack

### Backend

- **Java with Spring Boot**: The core of our application, processing primary tasks like generating the truncated URL and redirection.

- **H2 Database**: An embedded database utilized for developmental objectives. It houses the linkage between the primary URLs and their shorter equivalents.

- **Swagger**: A tool that generates API documentation and simplifies endpoint testing.

- **Docker**: Guarantees consistent application performance across various environments through containerization.

### Frontend

- **React**: A JS library for constructing user interfaces. Here, it offers a neat UI for users to interface with the URL shortening service.

- **Axios**: A promise-based HTTP client. Used to make asynchronous HTTP requests to our backend.

## ✨ Key Features

1. **URL Shortening**: Submit a long URL and receive its shortened version.
2. **URL Redirection**: Use the shorter URL to redirect to the original link.
3. **Error Handling**: Handles typical errors, such as malformed URLs or server unavailability, providing valuable feedback.

## 🛠 Prerequisites

- [Java](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) (Version 11 or higher)
- [Maven](https://maven.apache.org/download.cgi)
- [Node.js](https://nodejs.org/en/) (Version 14 or higher)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://classic.yarnpkg.com/en/docs/install/)
- [Docker](https://www.docker.com/products/docker-desktop) (Optional if using Docker Compose)

### 📝 Note
When deploying to a production environment, consider using a persistent database rather than H2, and ensure all endpoints are secure.

## 🚀 Improvements

### **Click Count**

- **Why?** Tracking the number of clicks a shortened URL receives can provide insights into its popularity and usage. This metric is essential for analytics and can help understand the effectiveness of content or campaigns.

### **Timeout for URLs**

- **Why?** Implementing a timeout for shortened URLs ensures they're not available indefinitely. This is particularly useful for temporary promotions or time-sensitive information.

### **Add Caching**

- **Why?** Implementing caching mechanisms can significantly improve response times and reduce the load on the database, leading to a smoother user experience and reduced operational costs.

### **Scale Database**

- **Why?** As the number of shortened URLs grows, there's a need to ensure that the database can handle the increased load. Scaling strategies, such as sharding or replication, can help in ensuring high availability and performance.

### **Increase Test Coverage**

- **Why?** Comprehensive tests ensure the system's reliability and robustness. By increasing test coverage, we can catch potential issues early and ensure that new features or changes don't introduce regressions.

---

Each of these improvements aims to enhance the performance, reliability, and user experience of the backend service.


## 🌐 Accessing Tools and Interfaces

### Swagger

Interactive API documentation:

http://localhost:8080/swagger-ui/index.html


### H2 Console

Inspect the in-memory H2 database:

http://localhost:8080/h2-console/

Make sure the JDBC URL aligns with your application settings.

### React Frontend

The primary interface:

http://localhost:3000/

## 🚀 Running the Project

### With Docker Compose

To spin up the entire service:

1. Navigate to the project's root directory.
2. Run:

```shell
$ docker-compose up --build
```
This command will start both the backend and frontend, providing an integrated development environment.


### Without Docker Compose

#### Backend

1. Navigate to the `backend` directory.
2. Run:
```shell
$ mvn clean install
```
3. After a successful build, start the application:
```shell
$ mvn spring-boot:run
```

The backend server will start, and it should be accessible at `http://localhost:8080/`.

#### Frontend

1. Navigate to the `frontend` directory.
2. Install the required npm packages:
```shell
$ npm install
```
or
```shell
$ yarn install
```
3. Start the React application:
```shell
$ npm start
```
or
```shell
$ yarn start
```
The React frontend will then be accessible at 
`http://localhost:3000/`.

## 🧪 Running Unit Tests

### Backend

1. Navigate to the `backend` directory.
2. Run the unit tests with Maven:

```shell
$ mvn test
```
This will execute all unit tests in your backend service. Maven will provide a summary of the test results in the console.

### Frontend
1. Navigate to the `frontend` directory.
2. Install the required npm packages (if you haven't already):
```shell
$ npm install
```
or
```shell
$ yarn install
```
3. Run the React application tests:
```shell
$ npm test
```
or
```shell
$ yarn test
```
