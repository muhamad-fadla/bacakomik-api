const express = require('express');
const axios = require('axios');
const parser = require('cheerio');
const app = express();

app.use(express.json());

var url = 'https://bacakomik.co'

const handle = async (req,res) => {

	await axios.get(url+'/komik-terbaru').then(re => {

		if(re.status != 200){
			return res.status(403).json({
				status: false,
				message: 'Server error'
			})
		}

		let $ = parser.load(re.data)

		let $manga = [];

		$('.animposx').each(function(i){

			console.log('k')

			$manga.push({
				title: $(this).find('.tt h4').text(),
				cover: $(this).find('.limit img').attr('src'),
				slug: $(this).find('a').attr('href')
			});
		});


		res.status(200).json({
			status: 'SUCCESS',
			data: $manga
		})
	}).catch(er => {
		console.log(er)
	})
}

app.get('/', handle)

app.listen(3000, () => console.log('Server running on PORT: 3000'))