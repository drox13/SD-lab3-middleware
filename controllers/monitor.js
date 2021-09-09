const axios = require('axios');
const redis = require("redis");
const { promisify } = require("util");
const client = redis.createClient(4010, '127.0.0.1');
const getAsync = promisify(client.get).bind(client);

client.on("error", function(error) {
    console.error(error);
});
  

//van las funciones Codigo

const postQuery = async (req, res) => {
    const info = req.body.info;
    const query = `SELECT * FROM tabla WHERE id == ${info}`;
    const cacheQuery = await getAsync('query').toString();
    if (query == cacheQuery) {
        //Este data es de prueba, el data real debe llegar de redis
        const data = 'Hola mundo';
       // const data = await getAsync('data').toString();
        res.send({
            data
        })
    }else{
        //haga la consulta al BD
        client.set("query", query);
        client.set("data", data);
        res.send({
            data
        })

    }
}

module.exports = {
    postQuery
}