import {updateLoginStatus, login} from '../../actions/userActions';


test('should set up update login status function',()=>{
    const action = updateLoginStatus();
    expect(action).toEqual({
        type: 'LOGIN_STATUS',
        loginStatus: ""
    })

})
test('should set up update login status function',()=>{
    const action = updateLoginStatus("failed");
    expect(action).toEqual({
        type: 'LOGIN_STATUS',
        loginStatus: "failed"
    })

})
test('should set up login action',()=>{
    const action = login({email: 'bill@gmail.com', password: 'red1234'},'123');
    expect(action).toEqual({
        type: 'LOGIN',
        user: {email: 'bill@gmail.com', password: 'red1234'},
        token: '123'
    })

})

