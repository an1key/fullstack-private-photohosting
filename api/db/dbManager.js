var sqlite3 = require('sqlite3')


const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER,
        nickName TEXT,
        passwordHash TEXT,
        salt TEXT,
        permissionStatus INTEGER DEFAULT 0
        )`

addToDb = function(user)
{
  let db = new sqlite3.Database('./catalogue.db', (err) => {
    if (err) console.error(err.message);
    else console.log('connected to db')

    })
  db.serialize(()=>{
    db.run(sql);
    db.get("SELECT * from users where nickName=? and passwordHash=?", 
    [user.nickName,user.passwordHash],function(err,row){
          if(typeof row!=='undefined' && row!=null)
          {
            console.log(`user ${user.nickName} already exists`)
            return;
          }
          else
          {
            var stmt = db.prepare("INSERT INTO users VALUES (?,?,?,?,?)");
            stmt.run(user.uuid,user.nickName,user.passwordHash,user.salt,user.permissionStatus);
            stmt.finalize();
          }
    });

  })
}
checkPass = function(user)
{
  let db = new sqlite3.Database('./catalogue.db', (err) => {
    if (err) console.error(err.message);
    else console.log('connected to db')

    })
  db.serialize(()=>{
    db.run(sql);
    db.get("SELECT * from users where nickName=? and passwordHash=?", 
    [user.nickName,user.passwordHash],function(err,row){
          if(typeof row!=='undefined' && row!=null)
          {
            console.log(`user ${user.nickName} already exists`)
            return;
          }
          else
          {
            var stmt = db.prepare("INSERT INTO users VALUES (?,?,?,?,?)");
            stmt.run(user.uuid,user.nickName,user.passwordHash,user.salt,user.permissionStatus);
            stmt.finalize();
          }
    });

  })
}

module.exports.addUser = addToDb;
module.exports.checkPass = checkPass;


