import jwt from 'jsonwebtoken';

const secretkey = process.env.JWT_SECRET || '1234-5678';

// Función para generar un token JWT
export const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, secretkey, {
        expiresIn: '1h',
    });
};

// Middleware para verificar el token JWT
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Received auth header:', authHeader);

  if (!authHeader) {
    return res.status(401).json({ error: true, message: 'No autorizado' });
  }

  const tokenParts = authHeader.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ error: true, message: 'Token inválido' });
  }

  const token = tokenParts[1];

  jwt.verify(token, secretkey, (err, decoded) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(401).json({ error: true, message: 'No autorizado' });
    }

    console.log('Token decoded:', decoded);
    console.log('Setting req.userId to:', decoded.id);
    req.userId = decoded.id;
    console.log('Setting asignado req.userId to:', req.userId);
    next();
  });
};
