
import * as Yup from "yup";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import authConfig from '../../config/auth.js'


class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    const isValid = await schema.isValid(req.body);

    const emailOrPasswordIncorrect = () => {
      return res
        .status(401)
        .json({ error: "Make sure your email or password are correct" });
    };

    if (!isValid) {
      return emailOrPasswordIncorrect();
    }

    const { email, password } = req.body;

    
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return emailOrPasswordIncorrect();
    }
  
    const passwordMatch = await user.checkPassword(password);

    if (!passwordMatch) {
      return emailOrPasswordIncorrect();
    }

    
    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
      token: jwt.sign(
        { id: user.id, name: user.name },
        authConfig.secret,
        { expiresIn: authConfig.expiresIn }
      )
    });
  }
}

export default new SessionController();
