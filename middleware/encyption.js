import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

const comparePasswords = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

export { encryptPassword, comparePasswords };
