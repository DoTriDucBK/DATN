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

    }
}
export default ClassTutorApi;