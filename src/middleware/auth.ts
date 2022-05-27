export default {
    // setUser (user: any) {
    //     localStorage.setItem('infinite_user', JSON.stringify(user))
    // },
    //
    // getUser (env: any) {
    //     return JSON.parse(localStorage.getItem('infinite_user'))
    // },BASE_URL: 'http://infinite-connect.herokuapp.com',

    logout () {
        localStorage.removeItem('infinite_user')
        localStorage.removeItem('infinitec_api_token')
    },

    setToken (token: string) {
        localStorage.setItem('infinitec_api_token', token)
    },

    check () {
        return localStorage.getItem('infinitec_api_token')
    },

    getToken () {
        return localStorage.getItem('infinitec_api_token')
    }
}
