import type { Core } from '@strapi/strapi';
import type { Context, Next } from 'koa';

import { PLUGIN_ID } from '../constants';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  cookiesParser: async (ctx: Context, next: Next) => {
    if (ctx.request.url.startsWith('/api') && ctx.cookies.get('Auth')) {
      const jwt = ctx.cookies.get('Auth');
      ctx.request.headers.authorization = `Bearer ${jwt}`;
    }

    await next();

    if (ctx.request.url.startsWith('/api/auth')) {
      if (ctx.response.body && ctx.response.body['jwt']) {
        const jwt = ctx.response.body['jwt'];

        const options = strapi.plugin(PLUGIN_ID).config('cookieOptions');
        ctx.cookies.set('Auth', jwt, options);

        if (strapi.plugin(PLUGIN_ID).config('deleteJwtFromResponse', true)) {
          delete ctx.response.body['jwt'];
        }
      }
    }
  },
});
