const Keygrip = require('keygrip')

export const cookieKeygrip = new Keygrip([process.env.SESSION_COOKIE_SECRET])
