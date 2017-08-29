import express from 'express'
import http from 'http'
import data from './music-data.json'

const app = express()
const apiRoutes = express.Router()

apiRoutes.get('/music-data', async(req, res) => {
	res.json({
		errno: 0,
		musicData: data.musicData
	})
})

apiRoutes.get('/one/:page?', async(req, res) => {
	const page = +req.params.page || 0
	const url = 'http://v3.wufazhuce.com:8000/api/onelist/idlist/?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android'
	let idList = ''

	//获取所有的歌曲id
	const getIdList = new Promise((resolve, reject) => {
	    http.get(url, response => {
	      response.on('data', data => {
	        idList += data
	      })
	      response.on('end', () => {
	        resolve(idList)
	      })
	    })
    })

	//根据id获取每一首歌曲
	const getOne = (id) => {
		let result = ''
		const url = `http://v3.wufazhuce.com:8000/api/onelist/${id}/0?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android`
		return new Promise((resolve, reject) => {
			http.get(url, response => {
				response.on('data', data => {
					result += data
				})
				response.on('end', () => {
					resolve(result)
				})
			})
		})
	}

	//取出每首歌的数据
	getIdList.then(idList => JSON.parse(idList).data)
		.then(data => {
			return Promise.all(data.map((item) => {
				return getOne(item).then(data => JSON.parse(data))
			}))
		})
		.then(list => {
			list = JSON.parse(JSON.stringify(list))
			res.json(list[page])
		})
})

apiRoutes.get('/search/:num/:name', async(req, res) => {
	const {num,name} = req.params

	const search = (n, keywords) => {
		return new Promise((resolve, reject) => {
			let searchResult = ''
			const url = encodeURI(`http://s.music.qq.com/fcgi-bin/music_search_new_platform?t=0&n=${n}&aggr=1&cr=1&loginUin=0&format=json&inCharset=GB2312&outCharset=utf-8&notice=0&platform=jqminiframe.json&needNewCode=0&p=1&catZhida=0&remoteplace=sizer.newclient.next_song&w=${keywords}`)
			http.get(url, response => {
				response.on('data', data => {
					searchResult += data
				})
				response.on('end', () => {
					resolve(searchResult)
				})
			})
		})
	}

	const searchResult = await search(num, name)
	res.json(JSON.parse(searchResult))
})

apiRoutes.get('/hot', (req, res) => {
	let hotKeywords = ['歌手', '许嵩', '双笙', '徐良', '张碧晨', '梁博', '周笔畅', '张靓颖', '陈奕迅', '周杰伦', '王力宏', 'TFBoys', '李玉刚', '魏晨', '薛之谦']
	let rHot = new Array(6)
	for (let i = 0; i < rHot.length; i++) {
		let length = hotKeywords.length
		let random = Math.floor(length * Math.random())
		rHot[i] = hotKeywords[random]
		hotKeywords.splice(random, 1)
	}
	res.json(rHot)
})

app.use('/api', apiRoutes)

module.exports = app