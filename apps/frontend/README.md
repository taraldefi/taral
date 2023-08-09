## Tariala Frontend

This repository contains the frontend code for the Tariala project.

## Docker Setup

To get a docker container running, run the following command:

`GITHUB_TOKEN` is used to install the private package `taral-ui`.

```bash
$ cp .env.example .env.production

$ COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build --build-arg GITHUB_TOKEN=$(cat .env.production | grep GITHUB_TOKEN | cut -d '=' -f2)

$ docker-compose up
```

## Services

- authService
- userService
- entityService
- emailService
- fileService
- roleService
- permissionService

## AuthService

### Methods

#### `login(username: string, password: string, remember: boolean): Promise<LoginResponse>`

This method is used to log in a user.

- **Parameters:**

  - `username` (string): The username of the user.
  - `password` (string): The password of the user.
  - `remember` (boolean): Whether to remember the login or not.

- **Returns:** A promise that resolves to a `LoginResponse` object containing the token.

---

#### `register(username: string, email: string, password: string, name: string): Promise<RegisterResponse>`

Registers a new user with the provided details.

- **Parameters:**

  - `username` (string): The username of the user.
  - `email` (string): The email address of the user.
  - `password` (string): The password of the user.
  - `name` (string): The name of the user.

- **Example:**
  ```javascript
  const response = await authService.register(
    "johnsmith",
    "john@example.com",
    "password123",
    "John Smith"
  );
  console.log(response);
  ```

---

#### `toggle2FA(isTwoFAEnabled: boolean): Promise<TwoFAResponse>`

Toggles the Two-Factor Authentication (2FA) setting for the user.

- **Parameters:**

  - `isTwoFAEnabled` (boolean): Indicates whether 2FA should be enabled or disabled.

- **Example:**
  ```javascript
  const response = await authService.toggle2FA(true);
  console.log(response);
  ```

---

#### `authenticateTwoFA(code: string): Promise<any>`

Authenticates the Two-Factor Authentication (2FA) code provided by the user.

- **Parameters:**

  - `code` (string): The 2FA code for authentication.

- **Example:**
  ```javascript
  const response = await authService.authenticateTwoFA("123456");
  console.log(response);
  ```

---

#### `activateAccount(token: string): Promise<void>`

Activates the user account using the activation token.

- **Parameters:**

  - `token` (string): The activation token for the account.

- **Example:**
  ```javascript
  await authService.activateAccount("activationToken123");
  ```

---

#### `logout(): Promise<void>`

Logs out the currently authenticated user.

- **Example:**
  ```javascript
  await authService.logout();
  ```

---

#### `forgotPassword(email: string): Promise<void>`

- **Parameters:**

  - `email` (string): The email address of the user.

- **Example:**
  ```javascript
  await authService.forgotPassword("user@example.com");
  ```

---

#### `resetPassword({ token, password, confirmPassword }: resetPasswordProps): Promise<void>`

Resets the user's password using the provided reset token and new password.

- **Parameters:**

  - `token` (string): The reset token received by the user.
  - `password` (string): The new password.
  - `confirmPassword` (string): The confirmation of the new password.

- **Example:**
  ```javascript
  await authService.resetPassword({
    token: "resetToken123",
    password: "newPassword123",
    confirmPassword: "newPassword123",
  });
  ```

---

#### `changePassword({ oldPassword, password, confirmPassword }: changePasswordProps): Promise<void>`

Changes the user's password with the provided passwords.

- **Parameters:**

  - `oldPassword` (string): The current password of the user.
  - `password` (string): The new password.
  - `confirmPassword` (string): The confirmation of the new password.

- **Example:**
  ```javascript
  await authService.changePassword({
    oldPassword: "oldPassword123",
    password: "newPassword123",
    confirmPassword: "newPassword123",
  });
  ```

---

#### `getProfile(): Promise<RegisterResponse>`

Fetches the profile of the authenticated user.

- **Returns:** A Promise that resolves to the user's profile data.

- **Example:**
  ```javascript
  const profile = await authService.getProfile();
  console.log(profile);
  ```

---

#### `updateProfile(userInfo: userProfile): Promise<RegisterResponse>`

Updates the profile information of the authenticated user.

- **Parameters:**

  - `userInfo` (userProfile): An object containing the updated user profile information.

- **Returns:** A Promise that resolves to the updated profile data.

- **Example:**
  ```javascript
  const updatedProfile = await authService.updateProfile({
    name: "John Doe",
    email: "john.doe@example.com",
    age: 30,
    // Include other profile properties as needed
  });
  console.log(updatedProfile);
  ```

---

## UserService

### Methods

### `getAllUsers(keywords: string, limit: number, page: number): Promise<RegisterResponse[]>`

This function retrieves a list of users based on the provided search criteria.

**Parameters:**

- `keywords` (string): Keywords to search for in user records.
- `limit` (number): The maximum number of users to retrieve.
- `page` (number): The page number of the user records to retrieve.

**Returns:**  
A Promise that resolves to an array of `RegisterResponse` objects representing the retrieved users.

**Example usage:**

```javascript
try {
  const users = await userService.getAllUsers("John Doe", 10, 1);
  console.log(users);
} catch (error) {
  console.error(error);
}
```

---

### `createUser(userInfo: IcreateUser): Promise<RegisterResponse>`

This function creates a new user.

**Parameters:**

- `userInfo` (IcreateUser): An object containing the user's information.

**Returns:**  
A Promise that resolves to a `RegisterResponse` object representing the created user.

**Example usage:**

```javascript
const newUser = {
  name: "John Doe",
  email: "johndoe@example.com",
  password: "password123",
};

try {
  const createdUser = await userService.createUser(newUser);
  console.log(createdUser);
} catch (error) {
  console.error(error);
}
```

---

### `getUserById(id: string): Promise<RegisterResponse>`

This function retrieves a user by their ID.

**Parameters:**

- `id` (string): The ID of the user to retrieve.

**Returns:**  
A Promise that resolves to a `RegisterResponse` object representing the retrieved user.

**Example usage:**

```javascript
const userId = "123456";

try {
  const user = await userService.getUserById(userId);
  console.log(user);
} catch (error) {
  console.error(error);
}
```

---

### `updateUser(id: string, userInfo: IupdateUser): Promise<RegisterResponse>`

This function updates a user's information.

**Parameters:**

- `id` (string): The ID of the user to update.
- `userInfo` (IupdateUser): An object containing the updated user information.

**Returns:**  
A Promise that resolves to a `RegisterResponse` object representing the updated user.

**Example usage:**

```javascript
const userId = "123456";
const updatedUserInfo = {
  name: "John Doe",
  email: "johndoe@example.com",
};

try {
  const updatedUser = await userService.updateUser(userId, updatedUserInfo);
  console.log(updatedUser);
} catch (error) {
  console.error(error);
}
```

---

## EntityService

### Methods

### `getEntity(id: string): Promise<EntityResponse>`

This function retrieves an entity by its ID.

**Parameters:**

- `id` (string): The ID of the entity to retrieve.

**Returns:**  
A Promise that resolves to an `EntityResponse` object representing the retrieved entity.

**Example usage:**

```javascript
const entityId = "123456";

try {
  const entity = await entityService.getEntity(entityId);
  console.log(entity);
} catch (error) {
  console.error(error);
}
```

---

### `createEntity(entity: Entity): Promise<EntityResponse>`

This function creates a new entity.

**Parameters:**

- `entity` (Entity): An object containing the entity information.

**Returns:**  
A Promise that resolves to an `EntityResponse` object representing the created entity.

**Example usage:**

```javascript
const newEntity = {
  name: "Example Entity",
  description: "This is an example entity.",
};

try {
  const createdEntity = await entityService.createEntity(newEntity);
  console.log(createdEntity);
} catch (error) {
  console.error(error);
}
```

---

### `deleteEntity(id: string): Promise<void>`

This function deletes an entity by its ID.

**Parameters:**

- `id` (string): The ID of the entity to delete.

**Returns:**  
A Promise that resolves to `void` (no return value).

**Example usage:**

```javascript
const entityId = "123456";

try {
  await entityService.deleteEntity(entityId);
  console.log("Entity deleted successfully.");
} catch (error) {
  console.error(error);
}
```

---

### `updateEntity(id: string, entity: Entity): Promise<EntityResponse>`

This function updates an entity's information.

**Parameters:**

- `id` (string): The ID of the entity to update.
- `entity` (Entity): An object containing the updated entity information.

**Returns:**  
A Promise that resolves to an `EntityResponse` object representing the updated entity.

**Example usage:**

```javascript
const entityId = "123456";
const updatedEntity = {
  name: "Updated Entity",
  description: "This entity has been updated.",
};

try {
  const updated = await entityService.updateEntity(entityId, updatedEntity);
  console.log(updated);
} catch (error) {
  console.error(error);
}
```

---
