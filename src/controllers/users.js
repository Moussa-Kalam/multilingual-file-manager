import database from '../database.js';

export const getUsers = async () =>{
  return database.query('SELECT * FROM users')
}

export const getUserById = async (id) =>{
 
    const [data]= await database.query(`SELECT * FROM users WHERE id = ${id} LIMIT 1`)
    if(data.length === 0) throw new Error('User not found')
    return data[0]
  
}

export const createUser = async ({email,password,language}) =>{
  const [data]= await database.query(`INSERT INTO users (email, password, language) VALUES ('${email}', '${password}', '${language}')`)
  return data 
}
export const updateUser = async (id, { email,password,language}) =>{
  const [data]= await database.query(`UPDATE users SET email = '${email}', password = '${password}', language = '${language}' WHERE id = ${id}`)
    console.log('Mother',data)
  return data 
}
export const deleteUser = async (id) =>{
  const [data]=await database.query(`DELETE FROM users WHERE id = ${id}`)
  return data 
}

export const findUserByEmail = async (email) =>{
  const [data]=await database.query(`SELECT * FROM users WHERE email = '${email}'`)
  return data 
}