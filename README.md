## Node.js Fundamentals 01
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png" alt="Banner" height="200" />

### Overview
This project is a simple API for performing CRUD operations on tasks, storing them in a local CSV file. It is built using vanilla Node.js to help learn foundational concepts.

### Features
- **CRUD Operations**: Create, Read, Update, and Delete tasks.  
- **CSV File Storage**: Tasks are stored in and loaded from a local CSV file.
- **Vanilla Node.js**: Built without any frameworks to understand core Node.js functionalities.

### Learning Objectives
- **Streams and Buffers**: Handling file operations efficiently.
- **Request and Response Data Manipulation**: Processing incoming request data and sending appropriate responses.
- **Query Parameters and Route Parameters**: Extracting and using parameters from URLs to update, delete or load filtered data.
- **Request Body Handling**: Parsing and using data sent in the body of HTTP requests.
- **HTTP Status Codes**: Sending appropriate HTTP status codes in responses.

### How to Run
1. **Clone the repository**:

    ```bash
    git clone https://github.com/rafaelrmb/nodejs_chal01.git
    cd nodejs_chal01
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Start the server**:

    ```bash
    node server.js
    ```

### Endpoints
- **POST - /tasks**
    - Create a new task with `title` and `description` provided in the request body.
    - Fields `id`, `created_at`, `updated_at`, and `completed_at` are automatically generated.

- **GET - /tasks**
    - List all tasks in the database.
    - Supports filtering tasks by `title` and `description`.

- **PUT - /tasks/:id**
    - Update a task by `id`.
    - Accepts `title` and/or `description` in the request body for updates.
    - Ensures the `id` exists before updating.

- **DELETE - /tasks/:id**
    - Remove a task by `id`.
    - Ensures the `id` exists before deleting.

- **PATCH - /tasks/:id/complete**
    - Mark a task as complete or revert it to an incomplete state.
    - Ensures the `id` exists before updating.

### Notes
- Ensure Node.js is installed on your machine.
- This project is intended for educational purposes to understand basic Node.js concepts.
