import axios from "axios/index";

const getHeaders = (token) => {
    // const token = reactLocalStorage.get("user.token", "");
    if (!token) token = "";
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': token
    }
}

const BASE_URL = "http://localhost:8081";

const MyService = {
    getRequestData: async function (url, params, token) {
        var result = await axios({
            method: 'get',
            url: BASE_URL + url,
            headers: getHeaders(token),
            params: params
        })
            .then(response => {
                return response.data;
            })
            .catch(
                error =>{
                    // console.log("Đức");
                    console.log(error)
                } 
            )
        return result;
    }
    ,
    postRequestData: async function (url, data, token) {
        var result = await axios.post(BASE_URL + url, data, {
            headers: getHeaders(token)
        })
            .then(response => {
                return response.data;
            })
            .catch(
                error => console.log(error)
            )
        return result;
    },
    putRequestData: async (url, data, token) => {
        var result = await axios.put(BASE_URL + url, data, {
            headers: getHeaders(token)
        })
            .then(response => {
                return response.data;
            })
            .catch(
                error => console.log(error)
            )
        return result;
    },
    deleteRequestData: async (url, token) => {
        var result = await axios.delete(BASE_URL + url, {
            headers: getHeaders(token)
        })
            .then(response => {
                return response.data;
            })
            .catch(
                error => console.log(error)
            )
        return result;
    },
    postSendEmail: async function (url, params) {
        var result = await axios.post(url, {}, {
            headers: getHeaders(),
            params: params
        })
            .then(response => {
                return response.data;
            })
            .catch(
                error => console.log(error)
            )
        return result;
    },
    postNotification: async function (data, token) {
        var obj = {
            "notification": {
                "title": data.title,
                "body": data.message,
                "click_action": "http://localhost:3000/",
                "icon": "http://localhost:3000/favicon.ico"
            },
            "to":token
        }
        var result = await axios.post("https://fcm.googleapis.com/fcm/send", obj, {
            headers: {
                "Authorization": "key=AAAAn5lU7ZI:APA91bEL6ETwQWXqCegLIK7e0bC0aT4ZrIy1fNzd6PG1HYhcJLwPcWG4lAUOjn6qNV-lOyzHzOA8cRkZLW36KQ89wtMhsQrjgVIU5iSicRpdNbIEXQw_OohaEcCU1ps206XVN2joe7Vg",
                'Content-Type': 'application/json'
        
            }
        })
            .then(response => {
                console.log("aaaa")                
            })
            .catch(
                error => console.log(error)
            )
        return result;
    }
}

export default MyService;