console.log("clientJs")

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