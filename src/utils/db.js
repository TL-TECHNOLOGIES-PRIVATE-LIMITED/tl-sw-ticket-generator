import sql from "mssql";

const config = {
  user: "db_aa5acd_swsilks_admin",
  password: "Tltech2025",
  database: "db_aa5acd_swsilks",
  server: "SQL9001.site4now.net",
  options: {
    encrypt: true, // Use encryption for secure connection
    trustServerCertificate: true, // Necessary for self-signed certificates
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("Connected to SQL Server");
    return pool;
  })
  .catch(err => console.error("Database connection failed!", err));

export default poolPromise;