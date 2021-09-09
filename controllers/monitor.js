const axios = require('axios');
const redis = require("redis");
const { promisify } = require("util");
const CircularList = require('../dataStructure/CircularList');
const Node = require('../dataStructure/Node');
const client = redis.createClient(4010, '127.0.0.1');
const getAsync = promisify(client.get).bind(client);

const circularList = new CircularList();

const PATH = process.cwd();

let node2 = new Node('instancia2');
circularList.addNode(node2);
let instance = circularList.pointer.data;


client.on("error", function(error) {
    console.error(error);
});
  

const postQuery = async (req, res) => {
    const info = req.body.info;
    const query = `SELECT * FROM tabla WHERE id == ${info}`;
    const cacheQuery = await getAsync('query').toString();

    //Esta parte es de pruebas
    const data = 'Hola mundo';
    client.set("query", query);
    client.set("data", data);
    res.send({
        data
    })
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
    //     res.send({
    //         data
    //     })
}

const getCpuUsage = axios.get('http://localhost:3000/resource/cpu')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

// function getRamAvalible() {
//     //return axios.get(`http://119.18.0.${instance.charAt(instance.length - 1)}:3306/resource/ram`);
//     return axios.get(`http://127.0.0.1:4003/resource/ram`);
// }
  
// function getCpuUsage() {
//   //return axios.get(`http://119.18.0.${instance.charAt(instance.length - 1)}:3306/resource/cpu`);
//   return axios.get(`http://127.0.0.1:4003/resource/cpu`);
// }

function writeLog(data) {
  createFileLogs();
  fs.appendFile(urlLogs, data, (err) => {
    if (err) console.log(err);
  });
}

const urlLogs = PATH + '/logers/Hystory.log';

function createFileLogs() {
	fs.open(urlLogs, 'r', function (err, f) {});
}

module.exports = {
    postQuery,
    getCpuUsage
}