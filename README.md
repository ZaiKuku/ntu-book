# NTUBOOK

An online platform designed for the second-hand books market at NTU

### Prerequisites

Make sure [Node.js](https://nodejs.org/) is installed before proceeding.

### Database Setup

- PostgreSQL version 16 or above is required.
- Restore the database using the SQL file located in the `db_backup` directory.

### Start the Backend

1. Navigate to the `backend` directory of the project:

   ```bash
   cd backend
   ```
2. Copy the contents of `backend/.env.example` and create a new `.env` file in the `backend` directory. Set the following variables:

   - `PORT`: Port of backend server, if blank, 8000 port will be used.
   - `PGUSER`: PostgreSQL username.
   - `PGPASSWORD`: PostgreSQL password.
   - `JWT_KEY`: Private key for generating JSON Web Tokens using asymmetric encryption.
   - `ADMIN_PASSWORD`: The password of admin. When you log in as admin, the password should be the same as this.
   
3. Run the following command to start the backend service:

   ```bash
   yarn
   yarn dev
   ```

### Start the Frontend

1. Navigate to the frontend directory of the project:

   ```bash
   cd Frontend
   ```
2. Install the dependencies to download and install all the required resources for the project.

   ```bash
   npm install
   ```
3. Run the following command to start the frontend development server:

   ```bash
   npm run dev
   ```

### Usage

- Open [localhost:3000](http://localhost:3000/) in your browser to access the frontend interface and start using the application.
- To use the Admin functionality:

  - Log in with the following credentials:
    - Username: admin
    - Password: password (Can be changed in the .env)
  - After logging in, navigate to `/AdminPage`.

### Notes

Ensure that you are in the correct directory when executing the above commands. Check the terminal output to confirm the correct installation of dependencies and the successful startup of services.

Enjoy using the project! If you encounter any issues, refer to the documentation or contact our support team.
