var express = require('express')
var router = express.Router()
var cheerio = require('cheerio')
var request = require('request')

var url = "http://www.cmegroup.com/trading/interest-rates/stir/eurodollar.html"

var abc = []

router.get('/', function(req, res, next) {

		request(url, function(err, resp, body){
			if(!err && resp.statusCode == 200) {
				var $ = cheerio.load(body);
			
				var frontMonthName = $('.cmeNoWrap').eq(1)
				var frontMonthText = frontMonthName.text()
				abc.push(frontMonthText)

				var frontMonth = $('#quotesFuturesProductTable1_GEH8_last')
				var frontMonthNumber = frontMonth.text()
				abc.push(frontMonthNumber)

				console.log(frontMonthText)
			}

			res.send(abc)	

		})	

})

module.exports = router