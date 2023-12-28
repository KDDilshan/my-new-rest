import express from 'express'
import  {getmethods} from './routes/route.js'
const app=express()
const port=3000

app.use(express.json())
app.use('/v1',getmethods)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(port,()=>{
    console.log(`the Server is lising to port ${port}`)
})