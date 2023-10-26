"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
exports.asyncPromise = (sql) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, rejects) => {
        pool.getConnection((connectionError, connection) => {
            if (connectionError)
                throw connectionError;
            connection.beginTransaction((transactionError) => {
                if (transactionError)
                    throw transactionError;
                connection.query(sql, (err, result) => {
                    try {
                        resolve(result);
                        connection.commit();
                    }
                    catch (_a) {
                        rejects(err);
                        connection.rollback();
                    }
                    finally {
                        connection.release();
                    }
                });
            });
        });
    });
});
