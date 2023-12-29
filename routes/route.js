import Express from 'express'
import bcrypt from 'bcrypt'
const router=Express.Router()
import { getmeaasges,
         getoneuser ,
        createoneuser,
        update_user,
        delete_user} from '../controllers/control.js'

router.get('/api/info',async(req,res)=>{
    try{
        const users=await getmeaasges()
        res.send(users)
    }catch(error){
        console.error('Error fetching data:',error)
        res.send(500).send('Internal server Error')
    }
    
})

router.get('/api/info/:id',async(req,res)=>{
    const id=req.params.id
    try{
        const users=await getoneuser(id)
        if (!users){
            res.status(404).json({ error: 'User not found' })
            return        
        }
        res.send(users)
    }catch(error){
        console.log("Error fething data:",error)
        res.status(500).send('Internal Server Error')
    }
    
})

router.post('/api/create',async(req,res)=>{
    try{
        const {id,name,age,password}=req.body
        const hash=await bcrypt.hash(password,5)
        const message=await createoneuser(id,name,age,hash)
        res.status(200).json({ message: 'User Cretted successfully' })
    }catch(error){
        console.log("Error in fletching data:",error)
        
        if(error.message==='User alraedy exists'){
            res.status(409).json({ error: 'User already exists' })   
        }else{
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
    
})

router.put('/api/update/:id',async(req,res)=>{
    try{
        const id=req.params.id
        const {name,age,password}=req.body
        const hash=await bcrypt.hash(password,5)
        const updatedvalue=await update_user(id,name,age,hash)
        res.status(200).json({ message: 'User updated successfully' })
        if (!updatedalue) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json({ message: 'User updated successfully' });
        }
    }catch(error){
        console.log("error in Fletching data:",error)
        res.status(500).send('Internal server error')
    }
    
})

router.delete('/api/delete/:id',async(req,res)=>{
    try{
        const id=req.params.id
        const user=await delete_user(id)
        if(!user){
            res.status(404).json({ message: 'User not found' })
        }
        res.status(204).json({ message: 'User Deleted successfully' })
    }catch(error){
        console.log("Error in code",error)
        res.status(500).send('Internal server error')
    }
    
})


export {router as getmethods}



