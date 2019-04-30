import MyService from '../utils/Service';
import MyUtils from '../utils/MyUtils';
const UserShareClassApi = {
    getAll: async () => {
        var classes = null;
        await MyService.getRequestData("/user-share")
            .then(result => {
                classes = result;

            })
            .catch(err => console.log(err));
        return classes;
    },
    getClassByIdUser: async (id) => {
        let result = await MyService.getRequestData("/user-share/class-id", { "idUser": id });
        return result
    },
    getClassByIdClass: async (id) => {
        let result = await MyService.getRequestData("/user-share/class-idClass", { "idClass": id });
        return result
    },
    createClassUser: async (data) => {
        console.log(data, "??????????????")
        var result = null;
        await MyService.postRequestData("/user-share", data)
            .then(data => result = data)
            .catch(err => console.log(err)) 
        if (result.data) {
            console.log("result: ", result.data)
        }
        return result

    },
    editClassUser: async ( data) =>{
        var classUser = null;
        await MyService.postRequestData("/user-share/edit-classUser",data)
            .then(result => {
                console.log(result);
                classUser = result;
            })
            .catch(err => console.log(err));
        console.log(classUser)
        return classUser;
    },
    getClassAndTutor:async (idUser) => {
        let result = await MyService.getRequestData("/user-share/class-user-of-class", { "idUser": idUser });
        return result
    },
    getClassAndTutorByIdTutor:async (options) => {
        options= MyUtils.clearBlank(options);
        let result = await MyService.getRequestData("/user-share/class-tutor-by-idUser", options);
        return result
    },
    searchClassUser: async (options) => {
        options= MyUtils.clearBlank(options);
        let result = await MyService.getRequestData("/user-share/search-notification", options);
        return result
    },
}
export default UserShareClassApi;