const https = require('https');

class LottoController {
    static async scrape () {
        data = {
            from: {
                month: 'January',
                day: '1',
                year: '2011'
            },
            to: {
                month: new Date.toLocaleString('default', { month: 'long' }),
                
            }
        };
        https.get('https://www.pcso.gov.ph/SearchLottoResult.aspx',);
    }
};

module.exports = LottoController;