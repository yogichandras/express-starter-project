import createError from 'http-errors';

export default async function (req, res, next) {
  console.log('isAuthenticated middleware', req.user);
  if (!req.user) {
    const error = createError(401, 'Not authenticated!');
    return next(error);
  }
  return next();
}
