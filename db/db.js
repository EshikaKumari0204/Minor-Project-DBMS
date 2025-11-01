import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
const db=mysql.createConnection({
  host:process.env.DB_HOST,
  user:process.env.DB_USER,
  password:process.env.DB_PASS,
  database:process.env.DB_NAME,
 
})
db.connect(err=>{
  if(err)throw err;
  console.log("mysql connected ");
})
export default db;
// mysql -h b08mjxqi1rriducdc8qw-mysql.services.clever-cloud.com.mysql.clever-cloud.com -u u45wrjlxliy9jfh5 -p b08mjxqi1rriducdc8qw