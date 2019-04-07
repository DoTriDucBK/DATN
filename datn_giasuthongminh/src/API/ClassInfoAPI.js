import MyService from '../utils/Service';
import MyUtils from '../utils/MyUtils';
const ClassInfoApi = {
    getAll: async () => {
        var classes = null;
        await MyService.getRequestData("/class-info")
            .then(result => {
                classes = result;

            })
            .catch(err => console.log(err));
        return classes;
    },
    getClassByIdUser: async (id) => {
        let result = await MyService.getRequestData("/class-info/class-id", { "idUser": id });
        return result
    },
    getClassByIdClass: async (id) => {
        let result = await MyService.getRequestData("/class-info/class-idClass", { "idClass": id });
        return result
    },
    createClassInfo: async (data) => {
        console.log(data, "??????????????")
        var result = null;
        await MyService.postRequestData("/class-info", data)
            .then(data => result = data)
            .catch(err => console.log(err)) 
        if (result.data) {
            console.log("result: ", result.data)
        }
        return result

    },
    searchClass: async (options) => {
        options= MyUtils.clearBlank(options);
        let result = await MyService.getRequestData("/class-info/search-class", options);
        return result
    },
}
export default ClassInfoApi;