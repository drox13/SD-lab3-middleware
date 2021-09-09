const lbOnline = document.querySelector('#lbOnline');
const lbOffline = document.querySelector('#lbOffline');

const client = io();

client.on('connect', () =>{
    console.log('Connected')
    lbOffline.style.display = 'none'
    lbOnline.style.display = ''
});

client.on('disconnect', () =>{
    console.log('Disconnect from server!')
    lbOnline.style.display = 'none'
    lbOffline.style.display = ''
});

client.on('send-data-resource', ({date, ram, cpu}) =>{
    console.log(date.toString());
    console.log(ram);
    console.log(cpu);
})

const sendInfo = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8000/query', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.response);
        }
    }
    const data = { info : 'redis' };
    xhr.send(JSON.stringify(data));
}