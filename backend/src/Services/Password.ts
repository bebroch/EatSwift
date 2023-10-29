import { SALT_STRING } from "../envinfo";
import bcrypt from "bcrypt";

async function hashingPassword(password: string) {
	return bcrypt.hash(password, SALT_STRING as string);
}

async function verifyPassword(password: string, hash: string) {
	return bcrypt.compare(password, hash);
}

export { hashingPassword, verifyPassword };
