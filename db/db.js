const mysql=require("mysql2/promise");
const dotenv=require("dotenv");
dotenv.config();

const pool = mysql.createConnection({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  port: process.env.MYSQL_ADDON_PORT
});

pool.connect(err => {
  if (err) {
    console.error(" Error while connecting:", err);
  } else {
    console.log(" MySQL connected successfully");
  }
});

export default pool;
// mysql -h b08mjxqi1rriducdc8qw-mysql.services.clever-cloud.com -P 3306 -u u45wrjlxliy9jfh5 -p b08mjxqi1rriducdc8qw
