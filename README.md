# COMP693_25S1_project_davisding95

## Project Setup Guide

### 1. Prerequisites
Before running this project, ensure that the following dependencies are installed:
- **MongoDB** (for database storage)
- **.NET 9.0** (for backend execution)
- **Node.js & npm** (for frontend execution)

### 2. Starting the Frontend
1. Open a terminal and navigate to the `cakeshop` folder.
2. Run the following command to install frontend dependencies:
   ```sh
   npm install
   ```
3. Run the following command to start the frontend service:
   ```sh
   npm run dev
   ```

### 3. Starting the Backend
1. Open a terminal and navigate to the `cakeshop-api/cakeshop-api` folder.
2. Run the following command to start the backend service:
   ```sh
   dotnet run
   ```

### 4. Setting Up the Database
1. Start the MongoDB service.
2. Connect to `localhost:27017`.
3. Click **Connect** to ensure the database connection is successful.

After completing these steps, your project should be up and running.

Active stripe: 
Open power shell
stripe listen --forward-to localhost:5056/api/webhooks

# okeyiibakery
