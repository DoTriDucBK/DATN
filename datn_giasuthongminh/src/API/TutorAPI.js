import MyService from '../utils/Service';

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