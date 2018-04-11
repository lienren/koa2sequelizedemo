/*
 * @Author: Lienren 
 * @Date: 2018-04-09 14:03:44 
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-04-09 15:35:30
 */
'use strict';

const join = require('path').join;
const db_config = require('./db_config');

// sequelize-auto -o "./models" -d mydb -h localhost -u root -p 3306 -x 123456 -e mysql

module.exports = {
  modelPath: join(process.cwd(), db_config.modelPath),
  db: db_config.dbname,
  dialect: db_config.dbtype,
  port: db_config.port,
  replication: {
    // Separation of reading and writing
    read: db_config.read,
    write: db_config.write
  },
  pool: {
    ...db_config.pool
  },
  define: {
    timestamps: false
  },
  logging: false
};
