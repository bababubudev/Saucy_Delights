# API DOCUMENTATION BY ZHIYUAN SO I KNOW THE ENDPOINTS

## User

**Log in User**

- **Description**: Log in a user with their email and password.
- **Route**: `POST /api/users/login`
- **Access**: Public

**Register User**

- **Description**: Register a new user.
- **Route**: `POST /api/users/register`
- **Access**: Public

```
    {
        email: string,
        name: string,
        password: string
    }
```

**Update User**

- **Description**: Update user information.
- **Route**: `PUT /api/users/update`
- **Access**: Private

**Delete User**

- **Description**: Delete the current user.
- **Route**: `DELETE /api/users/delete`
- **Access**: Private

**Get User Info by Token**

- **Description**: Get user information by the provided token.
- **Route**: `GET /api/users/me`
- **Access**: Private
