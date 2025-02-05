import { PLUGIN_ID } from '../constants';

const defaultConfig = {
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: 'lax',
    domain: process.env.CLIENT_DOMAIN,
    path: '/',
  },
  deleteJwtFromResponse: true,
};

export default {
  default: defaultConfig,
  validator(config: typeof defaultConfig) {
    if (typeof config.cookieOptions.secure !== 'boolean') {
      throw new Error(`Plugin ${PLUGIN_ID}: The config.cookieOptions.secure must be a boolean`);
    }

    if (typeof config.cookieOptions.maxAge !== 'number') {
      throw new Error(`Plugin ${PLUGIN_ID}: The config.cookieOptions.maxAge must be a number`);
    }

    if (typeof config.cookieOptions.sameSite !== 'string') {
      throw new Error(`Plugin ${PLUGIN_ID}: The config.cookieOptions.sameSite must be a string`);
    }

    if (typeof config.cookieOptions.domain !== 'string') {
      throw new Error(`Plugin ${PLUGIN_ID}: The config.cookieOptions.domain must be a string`);
    }

    if (typeof config.cookieOptions.path !== 'string') {
      throw new Error(`Plugin ${PLUGIN_ID}: The config.cookieOptions.path must be a string`);
    }

    if (typeof config.deleteJwtFromResponse !== 'boolean') {
      throw new Error(`Plugin ${PLUGIN_ID}: The config.deleteJwtFromResponse must be a boolean`);
    }

    return true;
  },
};
