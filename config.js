module.exports = {
  remoteDB: process.env.REMOTE_DB || false,
  api: {
    port: process.env.API_PORT || 3001
  },
  post: {
    port: process.env.POST_PORT || 3003
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'notasecret!'
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'remotemysql.com',
    user: process.env.MYSQL_USER || 'sYq1b3rVpJ',
    password: process.env.MYSQL_PASS || '7Wf1AMwpbr',
    database: process.env.MYSQL_DB || 'sYq1b3rVpJ',
  },
  mysqlService: {
    host: process.env.MYSQL_SRV_HOST || 'localhost',
    port: process.env.MYSQL_SRV_PORT || 3002,
  }
}