import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool=mysql.createPool({
    host:process.env.MYSQL_LINK,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABSENAME,
}).promise()


export const getmeaasges=(async ()=>{
    try{
        const [rows]= await pool.query('SELECT * FROM User')
        return rows
    }catch(error){
        console.log("Error fetchin message",error)
        throw new Error('Falied to get data from databse')
    }
    
})


export const getoneuser=(async(id)=>{
    try{
        const[result]=await pool.query(
            `SELECT * FROM User
             WHERE UserID=?`
             ,[id])
        return result
    }catch(error){
        console.log('Error in get one user:',error)
        throw new Error("Error in getting one user")
    }
   
})

export const createoneuser=(async(id,name,age,password)=>{
    try{
        const [create]=await pool.query(
            `INSERT INTO User(UserID,UserName,Age,Password)
             VALUES(?,?,?,?)`
            ,[id,name,age,password])
        return getoneuser(id)
    }catch(error){
        console.log("Error in creating user:",error)
        throw new Error('Cant create new user')
    }
    
})

export const update_user=(async(id,name,age,password)=>{
    try{
        const [updated]=await pool.query(
            `UPDATE User SET
            UserName=?,
            Age=?,
            Password=?
            WHERE UserID=?`
            ,[name,age,password,id])
        return updated
    }catch(error){
        console.log('Error in Updateing itmes')
        throw new Error("cant update the users")
    }
    
})

export const delete_user=(async(id)=>{
    try{
        const [result]=await pool.query(`
        DELETE FROM User
        WHERE UserID=?`,
        [id])
        return result
    }catch(error){
        console.log("error in Deleting items in databse")
        throw new Error('cant delete from dtabse quryy')
    }
    
})