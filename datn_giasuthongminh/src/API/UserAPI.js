import MyService from '../utils/Service';
import { reactLocalStorage } from "reactjs-localstorage";
const UserApi = {
    login: async (data) => {
        var result = null;
        await MyService.putRequestData("/user/login", data)
            .then(data => result = data)
            .catch(err => console.log(err))
        if (result && result.data) {
            console.log("result: ", result.data)
            reactLocalStorage.setObject("user.info", result.data);
        }
        return result
    },
    register: async (data) => {
        console.log(data, "??????????????")
        var result = null;
        await MyService.postRequestData("/user/signup", data)
            .then(data => result = data)
            .catch(err => console.log(err)) 
        if (result.data) {
            console.log("result: ", result.data)
            reactLocalStorage.setObject("user.info", result.data);
        }
        return result
    },
    logout: async () => {
        var user = reactLocalStorage.getObject("user.info", null);
        if (!user){
            console.log("Duc")
            return false
        } 
        else {
            var result = null;
            var token = user ? user.token : ""
            console.log(token);
            console.log(user.idUser);
            await MyService.putRequestData("/user/logout", { idUser: user.idUser }, token)
                .then(data => result = data)
                .catch(err => console.log(err))
                console.log("ĐUCCCC")
            if (result && result.code === "success") {
                reactLocalStorage.setObject("user.info", null);
                reactLocalStorage.setObject("home.is_login",false);
                console.log("DDDĐ")
                return true
            } else return false
        }
    },
    update: async (params) => {
        console.log("params", params)
        if (!params) return null;
        else {
            var user = reactLocalStorage.getObject("user.info", null);
            if (!user) return null;
            var token = user ? user.user_acc_tokn : ""
            var result = null;
            var url = "/users/edit"
            await MyService.putRequestData(url, params, token)
                .then(data => result = data)
                .catch(err => console.log(err))
            if (result && result.data) {
                reactLocalStorage.setObject("user.info", result.data)
            }
            return result
        }
    },
    changePassword: async (params) => {
        if (!params) return null;
        var user = reactLocalStorage.getObject("user.info", null);
        if (!user) return null;
        var token = user ? user.token: ""
        var result = null;
        await MyService.putRequestData("/user/change-password", params, token)
            .then(data => result = data)
            .catch(err => console.log(err))
        if (result && result.data) {
            console.log("user after change password",  result.data)
            reactLocalStorage.setObject("user.info", result.data)
        }
        return result
    },
    getUserByIdUser: async (id) => {
        let result = await MyService.getRequestData("/user/get-user-id", { "idUser": id });
        return result
    },
    getUserByName: async (name) => {
        let result = await MyService.getRequestData("/user/get-user-name", { "userName": name });
        return result
    },
    editUser: async ( data) =>{
        var user = null;
        await MyService.postRequestData("/user/edit-user",data)
            .then(result => {
                console.log(result);
                user = result;
            })
            .catch(err => console.log(err));
        console.log(user)
        return user;
    },
    updateTokenFirebase: async (idUser,token) => {
        var result ;
        await MyService.putRequestData("/user/token-firebase", {idUser: idUser, tokenFirebase: token})
            .then(data => result = data)
            .catch(err => console.log(err))
        return result;
    }
}
export default UserApi;