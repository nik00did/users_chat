function SendToServer() {

    const xhr = new XMLHttpRequest();

    const get = "GET";
    const post = "POST";

    this.getRequest = (url, data) => {

        const body = JSON.stringify(data);
        console.log(`this is body`);
        console.log(body);
        xhr.open(get, url, true);
        xhr.send(null);

        xhr.onload = function () {
            if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
                console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
                // alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
            } else { // если всё прошло гладко, выводим результат
                console.log(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
                // alert(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
            }
        };

        xhr.onprogress = function (event) {
            if (event.lengthComputable) {
                console.log(`Получено ${event.loaded} из ${event.total} байт`);
                // alert(`Получено ${event.loaded} из ${event.total} байт`);
                console.log(`Получено ${xhr.response} `);
                // alert(`Получено ${xhr.response} `);

            } else {
                console.log(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
                // alert(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
            }
        };

        xhr.onerror = function () {
            console.log("Запрос не удался");
            // alert("Запрос не удался");
        };

    }

    function postData(url = '', data = {}) {
        // Значения по умолчанию обозначены знаком *
        return fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data), // тип данных в body должен соответвовать значению заголовка "Content-Type"
        })
            .then(response => response.json()); // парсит JSON ответ в Javascript объект
    }

    this.postRequest = (url, data, callback) => {

        const body = JSON.stringify(data);
        // console.log(body);
        // console.log(post);
        // console.log(url);

        console.log(`postRequest ${url}`);


        xhr.open(post, url, true);
        xhr.setRequestHeader("Content-type", "application/json");

        xhr.send(body);

        xhr.onload = function () {
            if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
                console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
            } else { // если всё прошло гладко, выводим результат
                console.log(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
            }
        };

        xhr.onprogress = function (event) {
            if (event.lengthComputable) {
                console.log(`Получено ${event.loaded} из ${event.total} байт`);
                // alert(`Получено ${event.loaded} из ${event.total} байт`);
                console.log(`Получено ${xhr.response} `);
                callback(xhr.response);
                // alert(`Получено ${xhr.response} `);

            } else {
                console.log(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
                // alert(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
            }

        };

        xhr.onerror = function () {
            console.log("Запрос не удался");
            // alert("Запрос не удался");
        };

    };



};

