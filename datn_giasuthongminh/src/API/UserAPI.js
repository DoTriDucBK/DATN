import MyService from '../utils/Service';

const UserApi = {
    getAll: async () => {
        var users = null;
        await MyService.getRequestData("/user")
            .then(result => {
                users = result;

            })
            .catch(err => console.log(err));
        return users;
    },
    createUser: async (data) => {
        console.log(data, "??????????????")
        var result = null;
        await MyService.postRequestData("/user", data)
            .then(data => result = data)
            .catch(err => console.log(err)) 
        if (result.data) {
            console.log("result: ", result.data)
        }
        return result

    }
}
export default UserApi;