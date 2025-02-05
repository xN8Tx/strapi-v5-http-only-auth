# **HTTP Only Cookies Authentication**

## **Installation**

### **Via npm**

```sh
npm install strapi-v5-http-only-auth
```

### **Via yarn**

```sh
yarn add strapi-v5-http-only-auth
```

## **Configuration**

To configure the plugin, add the following code to your config file:

```ts
// config/plugins.ts

export default () => ({
  'strapi-v5-http-only-auth': {
    enabled: true,
    config: {
      // Default cookie settings
      cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        sameSite: 'lax',
        domain: process.env.CLIENT_DOMAIN,
        path: '/',
      },
      // If set to true, the JWT will be removed from the response
      // after a successful login or registration
      deleteJwtFromResponse: true,
    },
  },
});
```

## **How It Works**

The plugin sets the user’s JWT token from the `/api/auth/local` response into an HTTP-only cookie. When processing a request to the `/api` path, it intercepts the HTTP-only cookie and assigns its value to the `Authorization` header.

This plugin also provides a logout feature. To enable it, grant permissions to the logout endpoint in:

**Admin Panel → Settings → Roles → Authenticated → Users-permissions**

The logout route is available at:

```
DELETE /api/auth/local
```

### **Successful Logout Response:**

```json
{
  "message": "You have been logged out successfully."
}
```

Enjoy!
