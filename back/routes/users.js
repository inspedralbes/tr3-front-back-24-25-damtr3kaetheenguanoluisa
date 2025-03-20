import express from 'express';
import bcrypt from 'bcryptjs';
import  {Users} from '../models/index.js';
const router = express.Router();

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

router.post("/register", async (req, res) => {
  try {
    console.log("Datos recibidos en el backend:", req.body);
    const { userName, email, password } = req.body;

    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);

    const user = await Users.create({
      userName,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user.id, userName: user.userName, email: user.email }
    });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: error.message });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt for email:", email);

    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    res.json({
      success: true,
      message: 'Login successful',
      user: { 
        id: user.id, 
        userName: user.userName, 
        email: user.email 
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'An error occurred during login' 
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/newUser', async (req, res) => {
  try {
    const { userName, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = await Users.create({ userName, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const user = await Users.findByPk(req.params.id);
    if (user) {
      if(password) {
        const hashedPassword = await hashPassword(password);
        await user.update({ userName, email, password: hashedPassword });
      } else {
        await user.update({ userName, email });
      }
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;