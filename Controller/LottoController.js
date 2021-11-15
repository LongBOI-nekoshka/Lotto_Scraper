const https = require('https');

class LottoController {
    static async scrape () {
        https.get('https://www.pcso.gov.ph/SearchLottoResult.aspx',(res) => {
            res.on('data', (d) => {
                process.stdout.write(d);
            });
        });
    }
};

module.exports = LottoController;