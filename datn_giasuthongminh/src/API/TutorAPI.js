import MyService from '../utils/Service';
import MyUtils from '../utils/MyUtils';
const TutorApi = {
    getAll: async () => {
        var tutors = null;
        await MyService.getRequestData("/tutor")
            .then(result => {
                tutors = result;

            })
            .catch(err => console.log(err));
        return tutors;
    },
    getTutorBySubject: async (sub) => {
        let result = await MyService.getRequestData("/tutor/tutor-subject", { "nameSubject": sub });
        return result
    },
    getTutorById: async (id) => {
        let result = await MyService.getRequestData("/tutor/tutor-id", { "idTutor": id });
        return result
    },
    getTutorByName: async (name) => {
        let result = await MyService.getRequestData("/tutor/tutor-name", { "nameTutor": name });
        return result
    },
    searchTutor: async (options) => {
        options= MyUtils.clearBlank(options);
        let result = await MyService.getRequestData("/tutor/search-tutor", options);
        return result
    },
    createTutor: async (data) => {
        var tutor = null;
        await MyService.postRequestData("/tutor", data)
            .then(result => {
                console.log(result);
                tutor = result;
            })
            .catch(err => console.log(err));

        console.log(tutor)
        return tutor;
    },
    editTutor: async ( data) =>{
        var tutor = null;
        await MyService.postRequestData("/tutor/edit-tutor",data)
            .then(result => {
                console.log(result);
                tutor = result;
            })
            .catch(err => console.log(err));
        console.log(tutor)
        return tutor;
    }
}
export default TutorApi;