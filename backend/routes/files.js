import { Router } from 'express';
import * as fileController from '../controllers/files.js';
import upload from "../helpers/multerconfig.js"

const router = Router()

router.get('/', async (_req, response) => {
    try{
        const files = await fileController.getFiles();
        return response.status(200).json(files);
    }catch(error){
        return response.status(404).json({ status: 'fail', message: 'No files found' });
    }
})

router.post('/upload', (request, response, next) => {
  
    upload(request, response, (error) => {
       
        if (error) {
            console.log(error)
            return response.status(400).json({ status: 'fail', message: error.message });
        }
        next()
    })
},fileController.uploadFile)

router.patch('/update/:id', async (request, response) => {
    const id = Number(request.params.id);
   try {
    const file =  await fileController.updateFile(id, 
        request.body.filename
    );
    response.status(201).json({ status: 'success', message: 'File updated successfully', data: file });
   } catch (error) {
    return response.status(404).json({ status: 'fail', message:error.message });
   }
});

router.delete('/:id', async (request, response) => {
    const id = Number(request.params.id);
    try{
         await fileController.deleteFile(id);
        return response.status(200).json({ status: 'success', message: 'File deleted successfully' });
    }catch(error){
        return response.status(404).json({ status: 'fail', message: 'File not found' });
    }
})

export default router;