import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY;

export function verifyTokenMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  console.log('Token recibido:', token);  

  if (!token) {
      return res.status(401).json({ message: 'No token provided' });
  }
  try {
      const decoded = jwt.verify(token,SECRET_KEY);
      console.log("Token decodificado", decoded)
      req.verified_user_id = decoded.id; 
      next(); 
  } catch (err) {
      return res.status(403).json({ message: 'Invalid token' });
  }
}