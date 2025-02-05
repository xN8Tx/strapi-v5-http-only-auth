export default [
  {
    method: 'DELETE',
    path: '/auth/local',
    handler: 'auth.logout',
    config: {
      middlewares: ['plugin::users-permissions.rateLimit'],
      prefix: '',
    },
  },
];
