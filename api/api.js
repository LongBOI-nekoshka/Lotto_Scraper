const LottoController = require('../Controller/LottoController');

const api = (app) => {
    app.get('/test',() => {
        console.log('yes');
    })
};

module.exports = api;