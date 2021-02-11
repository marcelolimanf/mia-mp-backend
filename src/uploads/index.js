const fetch = require('node-fetch')

function criar() {
    fetch('https://api.mercadopago.com/v1/account/bank_report', {
        method: 'POST',
        headers: { 
            'accept': 'application/json', 
            'content-type': 'application/json', 
            'Authorization': 'Bearer APP_USR-7015178879753731-112613-116bf4141d89b4f0dd835874c46d65e9-27363593'
        },
        body: JSON.stringify({
            begin_date: "2021-01-01T00:00:00Z", 
            end_date: "2021-01-02T00:00:00Z" 
        })
    }).then(data => {
        return data.json()
    }).then(result => {
        console.log(result)
    })
}

function verificar() {
    fetch('https://api.mercadopago.com/v1/account/bank_report/list', {
        method: 'POST',
        headers: { 
            'accept': 'application/json', 
        },
        body: 'access_token=APP_USR-7015178879753731-112613-116bf4141d89b4f0dd835874c46d65e9-27363593'
    }).then(data => {
        return data.json()
    }).then(result => {
        console.log(result)
    })

}

verificar()