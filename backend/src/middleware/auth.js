module.exports = (req, res, next) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Não autorizado" });
    }
    next();
  };

  module.exports.isAdmin = (req, res, next) => {
    if (!req.session.userId) return res.status(401).send("Não autorizado");
    if (!req.session.isAdmin) return res.status(403).send("Não tem permissão");
    next();
  };
  
  