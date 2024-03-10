export const environment = {
    Production:false,
    BASE_API:'https://blogs-angular.onrender.com/api/', // for development 'http://localhost:5000/api/'
    Blogs:{
        GET_ALL_BLOGS:'blogs/getblogs',
        GET_BLOG:'blogs/getblog/',
        GET_USER_BLOGS:'blogs/getblogs/getusersblogs',
        CREATE_BLOG:'blogs/createblog',
        GET_LATEST_BLOGS:'blogs/getblogs?limit=5',
        GET_LATEST_USER_BLOGS:'blogs/getblogs/getusersblogs?limit=5',
        UPDATE_BLOG:'blogs/updateblog/',
        DELETE_BLOG:'blogs/deleteblog/',
    },
    AUTH:{
        CREATE_USER:'users/signup',
        LOGIN_USER:'users/login',
        GET_USER:'users/getuser',
        UPDATE_USER:'users/updateuser/',
    }
};
