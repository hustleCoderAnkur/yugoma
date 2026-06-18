import bcrypt from "bcryptjs";

export async function comparePassword(
    password: string,
    hashedPassword: string
) {
    return bcrypt.compare(password, hashedPassword);
}