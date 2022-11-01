import { compareSync, hashSync } from 'bcrypt';
import { Callback, Document, model, Schema } from 'mongoose';

const UserSchema = new Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	perms: { type: String, default: 'user' },
	number: { type: String, required: true, unique: true },
});

interface UserInterface extends Document {
	username: string;
	email: string;
	password: string;
	perms: 'user' | 'admin';
	number: string;

	comparePassword: (password: string, cb: Callback) => void;
}

UserSchema.methods.comparePassword = function (
	candidatePassword: string,
	cb: Callback
) {
	const success = compareSync(candidatePassword, this.password);

	cb(null, success);
};

UserSchema.pre('save', function (next) {
	if (this.isModified('password') || this.isNew) {
		const hash = hashSync(this.password, 12);

		this.password = hash;
		next();
	} else {
		return next();
	}
});

export const User = model<UserInterface>('User', UserSchema);
