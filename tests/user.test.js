const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
//can be reused
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

//runs before every test
beforeEach(setupDatabase);
//didnt need token
test('should signup a new user', async ()=>{
    const response = await request(app).post('/users').send({
        name: 'ron',
        email: 'ron@gmail.com',
        password: 'red1234'
    }).expect(201)

    //check user in db and assert
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();
    //assert that response body has the correct info
    expect(response.body).toMatchObject({
        user: {
            name: 'ron'
        },
        token: user.tokens[0].token
    })
    //expect oassword not to be plain text
    expect(user.password).not.toBe('red1234')
})
//didnt need token
test('should login exisiting user', async ()=>{
    //could create user here but better to do it in beforeEach(so can reuse for other test)
    const res = await request(app).post('/users/login').send({
        email : userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(res.body.user._id);
    expect(res.body.token).toBe(user.tokens[1].token)
})
//didnt need token
test('should not login non existant user', async ()=>{
    await request(app).post('/users/login').send({
        email : '',
        password: ''
    }).expect(400)
})

test('should get profile of a user', async ()=>{
    //need to set auth header
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('should not get profile of unauthenticated user', async ()=>{
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('should delete profile of authenticated user', async ()=>{
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOne._id);
    expect(user).toBeNull()
})
test('should not delete profile if unauthenticated user', async ()=>{
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

// test('Should upload avatar image', async () => {
//     await request(app)
//         .post('/users/me/avatar')
//         .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//         .attach('avatar', 'tests/fixtures/profile-pic.jpg')
//         .expect(200)
//     const user = await User.findById(userOneId)
//     console.log(user);
//     expect(user.avatar).toEqual(expect.any(Buffer))
// })

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Jess'
        })
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Jess')
})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Philadelphia'
        })
        .expect(400)
})