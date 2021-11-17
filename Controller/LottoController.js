const fs = require('fs');
const axios = require('axios');
var FormData = require('form-data');
const cheerio = require('cheerio');

class LottoController {
    static scrape () {        
        var data = new FormData();
        const lotto_array = [];
        data.append('ctl00$ctl00$cphContainer$cpContent$ddlStartMonth', 'November');
        data.append('ctl00$ctl00$cphContainer$cpContent$ddlStartDate', '14');
        data.append('ctl00$ctl00$cphContainer$cpContent$ddlStartYear', '2021');
        data.append('ctl00$ctl00$cphContainer$cpContent$ddlEndMonth', 'November');
        data.append('ctl00$ctl00$cphContainer$cpContent$ddlEndDay', '17');
        data.append('ctl00$ctl00$cphContainer$cpContent$ddlEndYear', '2021');
        data.append('ctl00$ctl00$cphContainer$cpContent$ddlSelectGame', '2');
        data.append('ctl00$ctl00$cphContainer$cpContent$btnSearch', 'Search Lotto');
        data.append('ctl00$ctl00$cphContainer$cpRightSidebar$TodaysNationalDraw$hSuspensionFrom', '2021/03/29');
        data.append('ctl00$ctl00$cphContainer$cpRightSidebar$TodaysNationalDraw$hSuspensionTo', '2021/03/29');
        data.append('ctl00$ctl00$cphContainer$cpRightSidebar$TodaysNationalDraw$hSuspensionTitle', 'Suspended pursuant to the directives under the ECQ');
        data.append('ctl00$ctl00$cphContainer$cpRightSidebar$TodaysNationalDraw$hLentenFrom', '2021/04/01');
        data.append('ctl00$ctl00$cphContainer$cpRightSidebar$TodaysNationalDraw$hLentenTo', '2021/04/05');
        data.append('__VIEWSTATEGENERATOR', '2DB88CA6');
        data.append('__EVENTVALIDATION', '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');
        data.append('__VIEWSTATE', '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');

        var config = {
            method: 'post',
            url: 'https://www.pcso.gov.ph/SearchLottoResult.aspx',
            headers: { 
                ...data.getHeaders()
            },
            data : data
        };

        return axios(config).then(function (response) {
            const cherry = cheerio.load(response.data);
 
            cherry('#cphContainer_cpContent_GridView1 > tbody > tr').each((index, element) => {
                if(cherry(cherry(element).find("td")[1]).text() !== "") {
                    lotto_array.push({
                        lotto_game:cherry(cherry(element).find("td")[0]).text(),
                        lotto_date:cherry(cherry(element).find("td")[2]).text(),
                        lotto_numbers:cherry(cherry(element).find("td")[1]).text().split('-')
                    });
                }
            });

            return lotto_array;

        }).catch(function (error) {
            console.log(error);
        });

    }

    static readFile () {
        const lotto_obj = JSON.parse(fs.readFileSync(__dirname+'\\csvjson.json', 'utf8'));
        var num_count = [];
        var sorted = {};
        var sum = 0;
        let lotto_numbers = lotto_obj.map((element) => {
            return element.COMBINATIONS.split("-");
        })

        lotto_numbers.map((element) => {
            element.map((index) => {
                for(let i = 1 ; i < 46 ; i++) {
                    if(index == i) {
                        num_count.push({
                            label:index
                        });
                    }
                }
            })
        })

        let counted = num_count.map(element => {
            return element.label;
        });
        counted.forEach(function (x) { sorted[x] = (sorted[x] || 0) + 1; })

        Object.values(sorted).map((element) => {
            sum += element;
        });
        return Object.entries(sorted).sort((a,b) => b[1]-a[1]).map(element=>{
            var test = {
                variable:element,
                percentage:parseFloat(element[1]/sum)
            }
            return test;
        });
    }
};

module.exports = LottoController;