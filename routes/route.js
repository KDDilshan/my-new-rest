import Express from 'express'
const router=Express.Router()
import { getmeaasges,
         getoneuser ,
        createoneuser,
        update_user,
        delete_user} from '../controllers/control.js'

router.get('/api/info',async(req,res)=>{
    const users=await getmeaasges()
    res.send(users)
})

router.get('/api/info/:id',async(req,res)=>{
    const id=req.params.id
    const users=await getoneuser(id)
    res.send(users)
})

router.post('/api/create',async(req,res)=>{
    const {id,name,age,password}=req.body
    const user=await createoneuser(id,name,age,password)
    res.status(200).json({ message: 'User Cretted successfully' })
})

router.put('/api/update/:id',async(req,res)=>{
    const id=req.params.id
    const {name,age,password}=req.body
    const updatedvalue=await update_user(id,name,age,password)
    res.status(200).json({ message: 'User updated successfully' })
})

router.delete('/api/delete/:id',async(req,res)=>{
    const id=req.params.id
    const message=await delete_user(id)
    res.status(200).json({ message: 'User Deleted successfully' })

})


export {router as getmethods}



