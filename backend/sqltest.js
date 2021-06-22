const sql = require('mssql');

const config = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  server: process.env.SERVER,
  stream: true,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
}

const pool = new sql.ConnectionPool(config);
const poolConnection = pool.connect();

const Insert = async (ParticipantId, NumericValue, MediaTime, SystemTime, StartTime, TimeSince) => {
  var transaction = new sql.Transaction(pool);
  try {
    await transaction.begin(err => {
      if (err) console.log("Transaction Begin Error: ", err)
  
      let rollBack = false
  
      transaction.on('rollback', aborted => {
        console.log(aborted)
  
        rollBack = true
      })
  
      const request = new sql.Request(transaction)

      // SERVER TIME
      //, convert(varchar,GETDATE(), 108)
      request.query(`INSERT INTO [${process.env.TABLE_NAME}] (ParticipantId, NumericValue, MediaTime, SystemTime, StartTime, TimeSince, ServerTime) 
                  VALUES ('${ParticipantId}', ${NumericValue}, '${MediaTime}', '${SystemTime}', '${StartTime}', '${TimeSince}', convert(varchar,GETDATE(), 108))`, (err, result) => {
        if (err) {
          if (err) console.log(err)
          if (!rollBack) {
            transaction.rollback(err => {
              if(err) console.log("Rollback Error: ", err)
            })            
          }
        } else {
          transaction.commit(err => {
            if (err) console.log("Transaction Commit Error: ", err)
            console.log("Transaction committed");
          })
        }  
      })
    })
  } catch(err) {
    console.log(err)
  }
}

module.exports = { Insert }