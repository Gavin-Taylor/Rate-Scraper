var express = require('express')
var router = express.Router()
var cheerio = require('cheerio')
var request = require('request')

var url = "http://www.cmegroup.com/trading/interest-rates/stir/eurodollar.html"

var abc = {}
var futureMonths = []
var futureNum = []

		
router.get('/', function(req, res, next) {

		request(url, function(err, resp, body){
			if(!err && resp.statusCode == 200) {
				var $ = cheerio.load(body)

				// select context that includes all month names, iterate through and push result to a var

				$("span.cmeNoWrap").each(function(){
				var months = $(this).text()
				futureMonths.push(months)
				})

				// select last traded prices from table by searching ids that end with 'last', iterate and push to a var

				$("[id$=last]").each(function(){
				var frontMonthNumber = $(this).text()
				futureNum.push(frontMonthNumber)
				})

				
				//One of many attempts to select id that ends in last. Dont know why not working..
				//var frontMonthNumber = $('id:contains("GEH8")').eq(1)
				//var frontMonth = frontMonthNumber.text()
				//abc.push(frontMonth)
				//Another attempt
				//var number = $('#quotesFuturesProductTable1').find('tbody > tr > td').eq(3)

				//console.log(futureMonths[0])
				//console.log(futureNum[0]) 
			
				// Select the first future month name from the table

				//var frontMonthName = $('.cmeNoWrap').eq(1)
				//var frontMonthText = frontMonthName.text()
				//abc.push(frontMonthText)

				// Select the first future month last traded value from the table

				//var frontMonth = $('#quotesFuturesProductTable1_GEH8_last')
				//var frontMonthNumber = frontMonth.text()
				//abc.push(frontMonthNumber)

				
			}

			// combine the months array with coresponding data array in key/value relationship

			for (var i = 0; i < futureMonths.length; i++)
				abc[futureMonths[i]] = futureNum[i]
    

			res.send(abc)	

		})	

})

module.exports = router