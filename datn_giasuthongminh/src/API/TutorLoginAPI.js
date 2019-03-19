import MyService from '../utils/Service';

const TutorLoginApi = {
    
    createTutorLogin: async (data) => {
        console.log(data, "??????????????")
        var result = null;
        await MyService.postRequestData("/tutor-login", data)
            .then(data => result = data)
            .catch(err => console.log(err)) 
        if (result.data) {
            console.log("result: ", result.data)
        }
        return result

    }
}
export default TutorLoginApi;