import type { Core } from '@strapi/strapi';

import routes from './routes';
import defControllers from './controllers';
import defMiddlewares from './middlewares';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  const controllers = defControllers();
  const middlewares = defMiddlewares({ strapi });

  // Setup controllers
  for (const [key, controller] of Object.entries(controllers)) {
    strapi.plugin('users-permissions').controllers['auth'][key] = controller;
  }

  // Setup middlewares
  strapi.server.use(middlewares.cookiesParser);

  // Setup routes
  strapi.plugin('users-permissions').routes['content-api'].routes.push(...routes);
};

export default register;
