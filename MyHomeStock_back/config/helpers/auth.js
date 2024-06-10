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
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).send('Token es requerido');
    }

    jwt.verify(token, secretkey, (err, decoded) => {
        if (err) {
            return res.status(401).send('No autorizado');
        }

        req.userId = decoded.id;
        next();
    });
};