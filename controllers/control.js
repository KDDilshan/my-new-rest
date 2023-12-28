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
    const [rows]= await pool.query('SELECT * FROM User')
    return rows
})

export const getoneuser=(async(id)=>{
    const[result]=await pool.query(
        `SELECT * FROM User
         WHERE UserID=?`
         ,[id])
    return result
})

export const createoneuser=(async(id,name,age,password)=>{
    const [create]=await pool.query(
        `INSERT INTO User(UserID,UserName,Age,Password)
         VALUES(?,?,?,?)`
        ,[id,name,age,password])
    return getoneuser(id)
})

export const update_user=(async(id,name,age,password)=>{
    const [updated]=await pool.query(
        `UPDATE User SET
        UserName=?,
        Age=?,
        Password=?
        WHERE UserID=?`
        ,[name,age,password,id])
    return updated
})

export const delete_user=(async(id)=>{
    const [result]=await pool.query(`
    DELETE FROM User
    WHERE UserID=?`,
    [id])
    return result
})