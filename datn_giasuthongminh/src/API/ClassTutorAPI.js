import MyService from '../utils/Service';
import MyUtils from '../utils/MyUtils';
const ClassTutorApi = {
    getAll: async () => {
        var classes = null;
        await MyService.getRequestData("/class-tutor")
            .then(result => {
                classes = result;

            })
            .catch(err => console.log(err));
        return classes;
    },
    getClassByIdUser: async (id) => {
        let result = await MyService.getRequestData("/class-tutor/class-id", { "idUser": id });
        return result
    },
    getClassByIdTutor: async (id) => {
        let result = await MyService.getRequestData("/class-tutor/class-idTutor", { "idTutor": id });
        return result
    },
    createClassTutor: async (data) => {
        console.log(data, "??????????????")
        var result = null;
        await MyService.postRequestData("/class-tutor", data)
            .then(data => result = data)
            .catch(err => console.log(err)) 
        if (result.data) {
            console.log("result: ", result.data)
        }
        return result

    },
    getClassAndTutorByIdTutor:async (options) => {
        options= MyUtils.clearBlank(options);
        let result = await MyService.getRequestData("/class-tutor/class-tutor-by-idTutor", options);
        return result
    },
    searchClassUser: async (options) => {
        options= MyUtils.clearBlank(options);
        let result = await MyService.getRequestData("/class-tutor/search-notification", options);
        return result
    },
    editClassTutor: async ( data) =>{
        var classTutor = null;
        await MyService.postRequestData("/class-tutor/edit-classTutor",data)
            .then(result => {
                console.log(result);
                classTutor = result;
            })
            .catch(err => console.log(err));
        console.log(classTutor)
        return classTutor;
    },
}
export default ClassTutorApi;