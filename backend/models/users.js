import database from "../database.js";

export const createUserModel = async ({ email, password }) => {
  const language = "en";
  const [data] = await database.query(
    `INSERT INTO users (email, password, language) VALUES ('${email}', '${password}', '${language}')`
  );

  return data;
};

export const getUsersModel = async () => {
  return await database.query("SELECT * FROM users");
};

export const getUserByIdModel = async (id) => {
  const [data] = await database.query(
    `SELECT * FROM users WHERE id = ${id} LIMIT 1`
  );

  return data?.[0] ? data[0] : undefined;
};

export const updateUserModel = async (id, { email, password, language }) => {
  const [data] = await database.query(
    `UPDATE users SET email = '${email}', password = '${password}' WHERE id = ${id}`
  );
  
  return data;
};

export const deleteUserModel = async (id) => {
  const [data] = await database.query(`DELETE FROM users WHERE id = ${id}`);
  return data;
};

export const findUserByEmailModel = async (email) => {
  const [data] = await database.query(
    `SELECT * FROM users WHERE email = '${email}'`
  );
  return data;
};
