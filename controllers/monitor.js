const axios = require("axios");
const redis = require("redis");
const { promisify } = require("util");
const CircularList = require("../dataStructure/CircularList");
const Node = require("../dataStructure/Node");
const client = redis.createClient(4010, "127.0.0.1");
const getAsync = promisify(client.get).bind(client);
const fs = require('fs');

const circularList = new CircularList();

const PATH = process.cwd();

let node2 = new Node("instancia2");
circularList.addNode(node2);
let instance = circularList.pointer.data;

client.on("error", function (error) {
  console.error(error);
});

const postQuery = async (req, res) => {
  const info = req.body.info;
  const query = `SELECT * FROM tabla WHERE id == ${info}`;
  const cacheQuery = await getAsync("query").toString();

  //Esta parte es de pruebas
  const data = "Hola mundo";
  client.set("query", query);
  client.set("data", data);
  res.send({
    data,
  });
  //hasta aca

  // if (query == cacheQuery) {
  //     Este data es de prueba, el data real debe llegar de redis
  //     const data = 'Hola mundo';
  //    const data = await getAsync('data');
  //     res.send({
  //         data
  //     })
  // }else{
  //     haga la consulta al BD
  //     client.set("query", query);
  //     client.set("data", data);
        //  writeLog('\n Ok ' + instance + ' ' + new Date());
				//  instance = circularList.nextPointer().data;
  //     res.send({
  //         data
  //     })
};

let ram = 1;
let cpu = 90;

const postLimits = (req, res) => {
  ram = req.body.ramData;
  cpu = req.body.cpuData;
  console.log(ram, cpu);
  res.send({
    msg: "ok",
  });
};

const checkStats = () => {
    if(ramAvalible < ram && cpuUsage > cpu){
      let numberInstance = fs.readFileSync(PATH + '/Docker/counter.tmp', 'utf8');
      circularList.addNode(new Node(`instancia${numberInstance}`));
      circularList.showList();
      shell.exec(PATH + `/Docker/newInstance.sh ${instance}` );
		  numberInstance++
		  fs.writeFileSync(PATH + '/docker/counter.tmp', numberInstance)
    }
}

let cpuUsage = 0;
let ramAvalible = 0;

const getCpuUsage = axios
  .get("http://localhost:3000/resource/cpu")
  .then(function (response) {
    cpuUsage = response.data.cpuUsage;
    console.log(cpuUsage);
  })
  .catch(function (error) {
    console.log(error);
  });

const getRamAvalible = axios
  .get("http://localhost:3000/resource/ram")
  .then(function (response) {
    ramAvalible = response.data.ramAvalible;
    console.log(ramAvalible);
  })
  .catch(function (error) {
    console.log(error);
  });

function writeLog(data) {
  createFileLogs();
  fs.appendFile(urlLogs, data, (err) => {
    if (err) console.log(err);
  });
}

const urlLogs = PATH + "/dataLogs/Hystory.log";

function createFileLogs() {
  fs.open(urlLogs, "r", function (err, f) {});
}

module.exports = {
  postQuery,
  getCpuUsage,
  getRamAvalible,
  postLimits,
  checkStats
};
