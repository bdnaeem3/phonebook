const koa = require('koa')
const bodyParser = require('koa-body')
const mongoose = require('mongoose');

const app = new koa()
const contacts = require('./routes/contacts');

mongoose.connect(`mongodb://localhost/phonebook`, {
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	})


app.use(bodyParser())
app.use(contacts.routes())

app.listen(5000, ()=>{
    console.log('App Started Successfully')
})