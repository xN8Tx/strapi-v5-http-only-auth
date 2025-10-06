// import type { Core } from '@strapi/strapi';
import type { Context } from 'koa';
import { PLUGIN_ID } from '../constants';

export default (/* { strapi }: { strapi: Core.Strapi } */) => ({
  logout: async (ctx: Context) => {
    const options = strapi.plugin(PLUGIN_ID).config('cookieOptions');

    if (ctx.cookies.get('Auth')) {
      ctx.cookies.set('Auth', null, { ...(options as {}), maxAge: 0, expires: new Date(0) });
      ctx.body = { message: 'You have been logged out successfully.' };
      return;
    }

    ctx.forbidden('You are not logged in.');
  },
});
