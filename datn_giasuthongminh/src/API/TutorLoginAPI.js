import MyService from '../utils/Service';
import { reactLocalStorage } from "reactjs-localstorage";
const TutorLoginApi = {
    login: async (data) => {
        var result = null;
        await MyService.putRequestData("/tutor-login/login", data)
            .then(data => result = data)
            .catch(err => console.log(err))
        if (result && result.data) {
            console.log("result: ", result.data)
            reactLocalStorage.setObject("tutor.login.info", result.data);
        }
        return result
    },
    register: async (data) => {
        console.log(data, "??????????????")
        var result = null;
        await MyService.postRequestData("/tutor-login/signup", data)
            .then(data => result = data)
            .catch(err => console.log(err)) 
        if (result.data) {
            console.log("result: ", result.data)
            reactLocalStorage.setObject("tutor.login.info", result.data);
        }
        return result
    },
    getUserById: async (user) => {
        var result = null;
        result = await MyService.getRequestData("/tutor-login/" + user.userId)
        // if (result.data) {

        //     var languageUser = reactLocalStorage.get("user.language");
        //     languageUser = (languageUser === undefined || languageUser == "vi") ? "vi" : "en";

        //     reactLocalStorage.set("language", languageUser);
        //     reactLocalStorage.setObject("user.info", result.data);
        // }
        return result
    },
    logout: async () => {
        var user = reactLocalStorage.getObject("tutor.login.info", null);
        if (!user){
            console.log("Duc")
            return false
        } 
        else {
            var result = null;
            var token = user ? user.token : ""
            console.log(token);
            console.log(user.idTutorLogin);
            await MyService.putRequestData("/tutor-login/logout", { idTutorLogin: user.idTutorLogin }, token)
                .then(data => result = data)
                .catch(err => console.log(err))
                console.log("ĐUCCCC")
            if (result && result.code === "success") {
                reactLocalStorage.setObject("tutor.login.info", null)
                console.log("DDDĐ")
                return true
            } else return false
        }
    },
    update: async (params) => {
        console.log("params", params)
        if (!params) return null;
        else {
            var user = reactLocalStorage.getObject("tutor.login.info", null);
            if (!user) return null;
            var token = user ? user.user_acc_tokn : ""
            var result = null;
            var url = "/tutor-login/edit"
            await MyService.putRequestData(url, params, token)
                .then(data => result = data)
                .catch(err => console.log(err))
            if (result && result.data) {
                reactLocalStorage.setObject("tutor.login.info", result.data)
            }
            return result
        }
    },
    changePassword: async (params) => {
        if (!params) return null;
        var user = reactLocalStorage.getObject("tutor.login.info", null);
        if (!user) return null;
        var token = user ? user.user_acc_tokn : ""
        var result = null;
        await MyService.putRequestData("/tutor-login/change-password", params, token)
            .then(data => result = data)
            .catch(err => console.log(err))
        if (result && result.data) {
            console.log("user after change password",  result.data)
            reactLocalStorage.setObject("tutor.login.info", result.data)
        }
        return result
    } 
}
export default TutorLoginApi;