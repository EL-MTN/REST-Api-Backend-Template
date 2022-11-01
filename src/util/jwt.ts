import { sign, verify } from 'jsonwebtoken';

export const createToken = (payload: string | object) => {
	return sign(payload.toString(), process.env.JWT_SECRET);
};

export const verifyToken = (token: string) => {
	try {
		return verify(token.toString(), process.env.JWT_SECRET);
	} catch (err) {
		return null;
	}
};
