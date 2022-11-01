import { RequestHandler } from 'express';
import { User } from '../models/User';
import { createToken } from '../util/jwt';

export const CreateUser: RequestHandler = async (req, res) => {
	const { username, email, password, number } = req.body;

	const checkUser = await User.findOne({
		$or: [{ username: username }, { email: email }, { number: number }],
	});

	if (checkUser !== null)
		return res.status(401).json({ error: 'User already exists' });

	const user = new User({
		username: username,
		email: email,
		password: password,
		number: number,
	});

	await user.save();

	const token = createToken(user._id);

	return res.status(200).json({ token });
};

export const LoginUser: RequestHandler = async (req, res) => {
	const { username, password } = req.body;

	const user = await User.findOne({ username: username });

	if (!user) {
		return res.status(401).json({ message: 'Invalid credentials' });
	}

	user.comparePassword(password, (_, isMatch) => {
		if (isMatch) {
			const token = createToken(user._id);

			return res.status(200).json({ token });
		} else {
			return res.status(401).json({ message: 'Invalid credentials' });
		}
	});
};
