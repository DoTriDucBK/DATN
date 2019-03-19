import MyService from '../utils/Service';

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

    }
}
export default ClassInfoApi;