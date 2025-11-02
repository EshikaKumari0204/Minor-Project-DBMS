module.exports = function requireRole(role) {
  return (req, res, next) => {
    if (!req.session || !req.session.user) {
      if (req.path.startsWith('/api/')) return res.status(401).json({ message: 'Unauthorized' });
      return res.redirect('/views/login.html');
    }
    if (req.session.user.role !== role) {
      if (req.path.startsWith('/api/')) return res.status(403).json({ message: 'Forbidden' });
      return res.status(403).send('Forbidden');
    }
    return next();
  };
};
//checks the role of user and gives access to privileges they are allowed to get