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
    createTutor: async () => {
        var options = {
            idTutor: 9,
            nameTutor: "Dương Ngọc Hưng",
            emailTutor:"duongngochung@gmail.com",
            telTutor:"09768378463",
            jobTutor:"Sinh viên năm 2",
            addressTutor:"Yên Mô, Ninh Bình",
            fee:"200000",
            birthdayTutor:"12-03-1999",
            idCity:9,
            nameCity:"Ninh Bình",
            nameAdress:"Tạ Quang Bửu",
            infoTutor:"Béo bụng",
            nameSubject:"Sinh học"
        };
        var tutor = null;
        
        await MyService.postRequestData("/tutor", options)
            .then(result => {
                console.log(result);
                tutor = result;
            })
            .catch(err => console.log(err));

        console.log(tutor)
        return tutor

    }
}
export default TutorApi;