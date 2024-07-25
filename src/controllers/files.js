import database from "./../database.js"
import { redisOptions } from "./../database.js"
import Bull from "bull"


const queue = new Bull("fileQueue", redisOptions)

export const uploadFile = async (request, response, next) => {
    const files = request.files.map(file =>{
        return {
            user_id: 1,
            name: file.filename,
            size: file.size,
            type: file.mimetype,
            path: file.path.split("public/")[1],
            created_at: new Date()
        }
    })

    await database.query(`INSERT INTO files (user_id, name, size, type, path, created_at) VALUES ?`, [files.map(file => Object.values(file))])

    response.status(201).json({ status: 'success', message: 'File uploaded successfully' });    
}

export const getFiles = async (request, response) => {
    const[ files] = await database.query(`SELECT * FROM files WHERE user_id = 1`)
    if (files.length === 0) {
       throw new Error('No files found')
    }
    return files
}

export const getFileById = async (id) => {
    const [file] = await database.query(`SELECT * FROM files WHERE id = ${id} AND user_id = 1`)
    if (file.length === 0) {
        throw new Error('File not found')
    }
    return file[0]
}

export const deleteFile = async (id) => {
    const file = await getFileById(id)
    await database.query(`DELETE FROM files WHERE id = ${id}`)
    return file
}

export const updateFile = async (id, file) => {
    await getFileById(id)
   await deleteFile(id)
   const fileToUpdate = {
         user_id: 1,
         id: id,
         name: file.name,
         size: file.size,
         type: file.type,
         path: file.path,
   }
    const updateFile = await uploadFile([fileToUpdate])
    return updateFile
}
