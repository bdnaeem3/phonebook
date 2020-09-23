const koaRouter = require('koa-router')
const router = new koaRouter()
const Contacts = require('../models/contacts');

router.get('/api/all-contacts', async ctx => {
    
    await Contacts.find()
        .then(contact=>{
            ctx.body = {
                error: false,
                contact
            }
        })
        .catch(err=>{
            ctx.body = {
                error: `Something Went Wrong :( ${err}`
            }
        })
})

router.post('/api/add-contact' , async ctx => {

    if(!ctx.request.body.name || !ctx.request.body.phone) {
        ctx.body = {
            error: "Data Missing..."
        }
    } else {
        const valid = /^(\+88|88)?01[3456789][0-9]{8}\b/.test(ctx.request.body.phone)

        if (valid) {
            const avaialble = await Contacts.find({
                phone: ctx.request.body.phone
            })

            if (avaialble.length > 0) {
                ctx.body = {
                    error: "This Phone Number already registered"
                }
            } else {
                var contact = new Contacts();
                contact.name = ctx.request.body.name;
                contact.phone = ctx.request.body.phone;
                await contact.save()
                    .then(data=>{
                        ctx.body = data
                    })
                    .catch(err=>{
                        ctx.body = {
                            error: 'Something wrong', err
                        }
                    })
            }
        } else {
            ctx.body = {
                error: "Phone Number not valid"
            }
        }
    }
})

router.post('/api/delete-contact/:phone' , async ctx => {

    const avaialble = await Contacts.find({
        phone: ctx.params.phone
    })

    if (avaialble.length !== 0) {
        await Contacts.deleteOne({
            phone: ctx.params.phone
        })
        .then(()=>{
            ctx.body = { status: "Contact Deleted Successfully!"}
        })
        .catch(()=>{
            ctx.body = {
                error: "Something went wrong!"
            }
        })
    } else {
        ctx.body = {
            error: "This phone number seems not registered"
        }
    }
})

router.put('/api/edit-contact/:id' , async ctx => {

    if(!ctx.request.body.phone) {
        ctx.body = {
            error: 'This number not avaialble'
        }
    } else {
        await Contacts.findOneAndUpdate(
            {_id: ctx.params.id},
            {name: ctx.request.body.name},
            {phone: ctx.request.body.phone},
        )
            .then(()=>{
                ctx.body = {status: "Contact Updated Successfully"}
            })
            .catch(err=>{
                ctx.body = {
                    error: 'Something wrong', err
                }
            })
    }
})

router.get('/api/search-contact/:phone' , async ctx => {

    if(!ctx.params.phone) {
        ctx.body = {
            error: "You need to send the phone number as params to get the user details"
        }
    } else {
        await Contacts.find({
            phone: ctx.params.phone
        })
        .then((data)=>{
            ctx.body = {
                name: data[0].name,
                phone: data[0].phone,
            }
        })
        .catch(()=>{
            ctx.body = {
                error: "The phone number is not registered."
            }
        })
    }
})

module.exports = router