import MyService from '../utils/Service';
import MyUtils from '../utils/MyUtils';
const ClassUserApi = {
    getAll: async () => {
        var classes = null;
        await MyService.getRequestData("/class-user")
            .then(result => {
                classes = result;

            })
            .catch(err => console.log(err));
        return classes;
    },
    getClassByIdUser: async (id) => {
        let result = await MyService.getRequestData("/class-user/class-id", { "idUser": id });
        return result
    },
    createClassUser: async (data) => {
        console.log(data, "??????????????")
        var result = null;
        await MyService.postRequestData("/class-user", data)
            .then(data => result = data)
            .catch(err => console.log(err)) 
        if (result.data) {
            console.log("result: ", result.data)
        }
        return result

    }
}
export default ClassUserApi;