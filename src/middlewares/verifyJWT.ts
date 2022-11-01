import { RequestHandler } from 'express';
import { verifyToken } from '../util/jwt';

export const verifyJWT: RequestHandler = (req, _, next) => {
	const authHeader = req.headers['authorization'];

	const token = verifyToken(authHeader && authHeader.split(' ')[1]);

	if (token) {
		req.user = token as string;
	}

	next();
};
