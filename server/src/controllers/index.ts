// import type { Core } from '@strapi/strapi';
import type { Context } from 'koa';

export default (/* { strapi }: { strapi: Core.Strapi } */) => ({
  logout: async (ctx: Context) => {
    if (ctx.cookies.get('Auth')) {
      ctx.cookies.set('Auth', null);
      ctx.body = { message: 'You have been logged out successfully.' };
      return;
    }

    ctx.forbidden('You are not logged in.');
  },
});
