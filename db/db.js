import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
const pool=mysql.createConnection({
  host:process.env.DB_HOST,
  user:process.env.DB_USER,
  password:process.env.DB_PASS,
  database:process.env.DB_NAME,
 
})
pool.connect(err=>{
  if(err){
    console.log("error while connecting ",err);
  }
  console.log("mysql connected ");
})
export default pool;
// mysql -h b08mjxqi1rriducdc8qw-mysql.services.clever-cloud.com -P 3306 -u u45wrjlxliy9jfh5 -p b08mjxqi1rriducdc8qw
