# Mini User & Family Management System

## Project Overview

This project is a Mini User & Family Management System built using Node.js, Express.js, EJS, and MongoDB. It allows users to manage their profiles and their children's information in a structured way.

## Database Structure

### User Collection
- **firstName**: String, required
- **lastName**: String, required
- **email**: String, required, must be unique
- **phone**: String, required

### Child Collection
- **firstName**: String, required
- **lastName**: String, required
- **age**: Number, required
- **email**: String, required
- **parentId**: ObjectId, required (references the User collection)

## Relationship Between User and Child

Each child document in the Child collection has a `parentId` field that stores the MongoDB `_id` of the parent user from the User collection. This establishes a one-to-many relationship where one user can have multiple children.

## Route Flow

1. **POST /users**: Create a new user.
2. **GET /users/:id**: Retrieve a user by ID and display their profile along with their children.
3. **POST /users/:id/children**: Add a new child to a user.
4. **GET /users/:id/children**: Retrieve all children belonging to a specific user.
5. **PATCH /children/:id**: Update a child's information.
6. **DELETE /children/:id**: Delete a child from the database.
7. **GET /users/:id/children/:childId**: Retrieve a specific child belonging to a user, ensuring the child belongs to the requested user.

## Project Folder Structure

- **family-management/**: Root directory of the project.
  - **models/**: Contains Mongoose models for User and Child.
    - **User.js**: Mongoose model for the User collection.
    - **Child.js**: Mongoose model for the Child collection.
  - **views/**: Contains EJS templates for rendering dynamic pages.
    - **profile.ejs**: Displays user profile and children.
    - **child.ejs**: Displays individual child details.
    - **add-child.ejs**: Form for adding a new child.
    - **404.html**: Error page for not found routes.
  - **index.js**: Main entry point of the application where the server is set up.
  - **package.json**: Contains project metadata and dependencies.
  - **.env**: Environment variables, including MongoDB connection string and port.
  - **README.md**: Documentation for the project.

## Explanation of req.params and req.body

- **req.params**: This is an object containing properties mapped to the named route parameters. For example, in the route `GET /users/:id`, `req.params.id` will contain the value of `:id` from the URL, allowing us to access the specific user ID.

- **req.body**: This is an object containing data sent in the request body, typically used with POST and PATCH requests. For example, when creating a new user with `POST /users`, the user data (firstName, lastName, etc.) will be sent in the request body and can be accessed using `req.body`.

---

Please say "continue" when you are ready for the next step.