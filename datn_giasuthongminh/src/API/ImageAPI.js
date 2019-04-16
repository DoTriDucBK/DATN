import MyService from '../utils/Service';
import MyUtils from '../utils/MyUtils';
 const ImageApi = {
     uploadHandler: async (selectFile) => {
         const data = new FormData();
         let path;
         data.append('myImg', selectFile);
         var result = await MyService.postRequestData("/upload", data, {
            'accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        })
        if(result){
            return result.path;
        }
        return null;
     }
 }
 export default ImageApi