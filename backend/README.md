# Backend for Item Management System

## Setup Instructions

### Prerequisites
- Node.js installed (v14 or later recommended)
- MySQL server running locally or remotely

### Installation
1. Clone this repository.
2. Navigate to the backend directory.
3. Run `npm install` to install all dependencies.

### Database Setup
1. Ensure MySQL is running.
2. Create the database and tables by executing:
   ```bash
   mysql -u root -p < /path/to/schema.sql

### Running the Server
- Start the server with:
  ```bash
  npm run serve


### API EndPoints
1. POST /api/items
- Description: Create a new item.
- Request body:
  ```json
  {
  "name": "Item Name",
  "description": "Item Description",
  "price": 9.99
 }

2. GET /api/items
- Description: Retrieve all items.

3. GET /api/items/:id
- Description: Retrieve an item by its ID.

4. PUT /api/items/:id
- Description: Update an existing item by its ID.
- Request body: 
  ```json
  {
  "name": "Updated Item Name",
  "description": "Updated Description",
  "price": 19.99
}

5. DELETE /api/items/:id
- Description: Delete an item by its ID.


### Additional Notes
1. The backend uses CORS to allow requests from specific origins, which is currently set to allow http://localhost:5173. Adjust corsOption as needed based on your frontend deployment.
2. Known issues: There are currently no major issues reported. Check the issue tracker for more details on minor issues.
3. Future enhancements: Plans include implementing user authentication, adding comprehensive logging, and improving error handling for better stability and security.











