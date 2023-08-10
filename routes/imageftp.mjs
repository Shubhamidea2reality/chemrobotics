import img64 from "image-base64-ftp";
import dotenv from "dotenv";
dotenv.config();
/*
 * Get Image as Base64;
 */
export const GetBase64Image = async(req,res) => {

    try {
        
        var strhost=process.env.FTP_HOSTNAME_COM;
        var strusername=process.env.FTP_USERNAME_COM;
        var strpassword=process.env.FTP_PASSWORD_COM;

        console.log(req);
        result= await img64.getImage64Ftp(req.body.imgfilepath,
        strhost,strusername,strpassword);

        res.json({
            'imgbase64': result
        });
    }
    catch (e) {
        res.json({
            'message': e.message
        });
    }
    
}



