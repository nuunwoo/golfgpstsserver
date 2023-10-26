const mysql = require('mysql');

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const db = {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  multipleStatements: true,
};

const pool = mysql.createPool(db);
exports.pool = pool;

exports.asyncPromise = async (sql: string) => {
  return new Promise((resolve, rejects) => {
    pool.getConnection((connectionError: Error, connection: typeof mysql.Connection) => {
      if (connectionError) throw connectionError;
      connection.beginTransaction((transactionError: Error) => {
        if (transactionError) throw transactionError;
        connection.query(sql, (err: typeof mysql.MysqlError, result: any) => {
          try {
            resolve(result);
            connection.commit();
          } catch {
            rejects(err);
            connection.rollback();
          } finally {
            connection.release();
          }
        });
      });
    });
  });
};
