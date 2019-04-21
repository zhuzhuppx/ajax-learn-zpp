const express = require("express");
const bodyParser = require('body-parser');//解析前端传过来的数据的中间件
const app = express();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use(urlencodedParser)
const users = require("./users.js");
let dataSource = Object.assign([], users);
app.get("/getMSG", (req, res) => {
  /**在react中使用axios更加的简便！！！！！ */
  let html = `在react中使用axios更加的简便！！！！！`;
  res.send(html);
});
app.get("/getSimpleList", (req, res) => {
  let array = `[1,2,3,4,5,6,7]`;
  res.send(array);
});
app.all("/getUserList", (req, res) => {
  res.send(dataSource);
});
app.get("/deleteUser", (req, res) => {
  let { id } = req.query;
  dataSource = dataSource.filter(i => i.id != id);
  res.send("delete success");
});
app.post("/saveUser", (req, res) => {
  let item = req.body;  
  let { id } = item;
  if(id){
    for (let index = 0, len = dataSource.length; index < len; index++) {
      const element = dataSource[index];
      if (element.id == id) {
        dataSource[index] = item;
      }
    }
  }else{
    item.id = dataSource.length+1;
    dataSource.push(item)
  }

  res.send("saveUser success");
});
app.post("/upload", (req, res) => {
  res.send("https://hbimg.huabanimg.com/eefd3d12e96f0c2db6cb74f77a4fb62ecb9c6c59ae1f-4SnBo5_fw658");
});
app.listen(3006, () => console.log("Example app listening on port 3006!"));
