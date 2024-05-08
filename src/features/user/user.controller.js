import jwt from 'jsonwebtoken';
import UserRepository from './user.repository.js';
import bcrypt from 'bcrypt';

export default class UserController {

    constructor() {
        this.userRepository = new UserRepository();
    }


    async signUp(req, res, next) {
        const {
            email,
            password,
        } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = { email, password: hashedPassword };
            await this.userRepository.signUp(user);
            res.status(201).send(user);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
        }
    }

    async signIn(req, res, next) {
        try {
            // 1. Find user by email.
            const { email, password } = req.body;
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                return res
                    .status(401)
                    .send('Incorrect email');
            }
            // 2. Compare password with hashed password.
            const passwordMatch = bcrypt.compare(password, user.password);
            if (passwordMatch) {
                // 3. Create token.
                const token = jwt.sign(
                    {
                        userID: user._id,
                        email: user.email,
                    },
                    'AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz',
                    {
                        expiresIn: '1h',
                    }
                );
                // 4. Send token.
                return res.status(200).send(token);
            } else {
                return res
                    .status(401)
                    .send('Incorrect Credentials');
            }
        } catch (err) {
            console.log(err);
            return res.status(200).send("Something went wrong");
        }
    }
}
