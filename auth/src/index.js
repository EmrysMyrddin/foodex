const Koa = require('koa')
const Router = require('@koa/router')
const bodyParser = require('koa-bodyparser')
const service = require('./service')
const { error } = require('./errors')

const app = new Koa()

const router = new Router()

router.post('/login', async  (ctx) => {
	checkFields(['username', 'password'], ctx.request.body.input)
	ctx.body = await service.login(ctx.request.body.input)
})

router.post('/user', async (ctx) => {
	checkFields(['username', 'password'], ctx.request.body.input)
	ctx.body = await  service.createUser(ctx.request.body.input)
})

function checkFields(fields, input) {
	const missingFields = fields.filter(field => !input[field])
	if(missingFields.length !== 0) {
		throw error(400, 'missing fields ${missingFields.join(', ')}')
	}
}

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

const port = process.port || 4000

app.listen(port, () => {
	console.info(`listening on port ${port}`)
})
