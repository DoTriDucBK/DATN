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
    getClassByIdClass: async (id) => {
        let result = await MyService.getRequestData("/class-user/class-idClass", { "idClass": id });
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

    },
    editClassUser: async ( data) =>{
        var classUser = null;
        await MyService.postRequestData("/class-user/edit-classUser",data)
            .then(result => {
                console.log(result);
                classUser = result;
            })
            .catch(err => console.log(err));
        console.log(classUser)
        return classUser;
    },
    getClassAndTutor:async (idUser) => {
        let result = await MyService.getRequestData("/class-user/class-tutor", { "idUser": idUser });
        return result
    },
    searchClassUserByStatus: async (options) => {
        options= MyUtils.clearBlank(options);
        let result = await MyService.getRequestData("/class-user/class-tutor-by-status", options);
        return result
    },
    getClassAndTutorByIdTutor:async (options) => {
        options= MyUtils.clearBlank(options);
        let result = await MyService.getRequestData("/class-user/class-tutor-by-idTutor", options);
        return result
    },
    getClassAndTutorByIdAndStatus:async (options) => {
        options = MyUtils.clearBlank(options);
        let result = await MyService.getRequestData("/class-user/class-tutor-by-id-status", options);
        return result
    },
    searchClassUser: async (options) => {
        options= MyUtils.clearBlank(options);
        let result = await MyService.getRequestData("/class-user/search-notification", options);
        return result
    },
}
export default ClassUserApi;