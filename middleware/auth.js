module.exports = function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.user) return next();
  //for apicalls
  if (req.path.startsWith('/api/')) return res.status(401).json({ message: 'Unauthorized' });
  return res.redirect('/views/login.html');
};
