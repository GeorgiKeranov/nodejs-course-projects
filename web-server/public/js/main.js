fetch('http://localhost:3000/weather?address=Sofia%20Bulgaria')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error);
    });