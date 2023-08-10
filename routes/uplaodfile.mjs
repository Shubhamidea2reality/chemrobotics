import fs from "fs";
import fs_extra from 'fs-extra';
import ftp from "basic-ftp";
import dotenv from "dotenv";
dotenv.config();
/*
 * Uplaod file to folder.
 */
export const UploadFile = (req, res) => {
  console.log(req.body);
  console.log(req.files.myfile);
  var file = req.files.myfile[0];
  //console.log(file.originalFilename);
  console.log(file.path);
  let directory = file.path.split("\\")[0];
  let filename = file.originalFilename;
  let newpath = directory + "\\" + file.originalFilename;
  //rename the uploaded file

  let topath = req.body.topath;

  let new_pathftppath = `${topath}/${filename}`;

  try {
    //rename the file
    //fs.renameSync(file.path,newpath);

    UploadToFtp(file.path, new_pathftppath);

    res.json({
      message: "File uploaded successfully",
    });
  } catch (e) {
    res.json({
      message: e.message,
    });
  }
};

/*
 * Uplaod multiple file to folder.
 */
export const UploadFiles = (req, res) => {
  console.log(req.body);
  console.log(req.files);
  console.log(req.files.myfile);
  try {
    let topath = req.body.topath;
    let remove_oldfiles_directory=req.body?.remove_oldfiles_directory;
    if (!fs.existsSync(topath)){
        fs.mkdirSync(topath, { recursive: true,mode:"0777" } );
        
    }
    else{
      if(remove_oldfiles_directory=="YES"){
        fs_extra.emptyDirSync(topath);
      }
    }

    for (let i = 0; i < req.files.myfile.length; i++) {
        const file = req.files.myfile[i];
        //console.log(file.originalFilename);
        console.log(file.path);
        let directory = file.path.split("\\")[0];
        let filename = file.originalFilename;
        let newpath = directory + "\\" + file.originalFilename;
        
        let new_pathftppath = `${topath}/${filename}`;
        console.log(new_pathftppath);

        //rename the uploaded file and move
        fs.renameSync(file.path,new_pathftppath);
        
        
      }
    

    res.json({
      message: "File(s) uploaded successfully",
    });
  } catch (e) {
    res.json({
      message: e.message,
    });
  }
  
};

export const UploadFile_Vendorpublic = (req, res) => {
  console.log(req.body);
  console.log(req.files.myfile);
  var file = req.files.myfile[0];
  //console.log(file.originalFilename);
  console.log(file.path);
  let directory = file.path.split("\\")[0];
  let filename = file.originalFilename;
  let newpath = directory + "\\" + file.originalFilename;
  //rename the uploaded file

  let topath = "/public_html/agropat/images/innovators_logo";

  let new_pathftppath = `${topath}/${filename}`;

  try {
    //rename the file
    //fs.renameSync(file.path,newpath);

    UploadToFtp(file.path, new_pathftppath);

    res.json({
      message: "File uploaded successfully",
    });
  } catch (e) {
    res.json({
      message: e.message,
    });
  }
};

async function UploadToFtp(file_to_upload, new_pathftppath) {
  const client = new ftp.Client();
  client.ftp.verbose = true;
  try {
    await client.access({
      host: process.env.FTP_HOSTNAME_COM,
      user: process.env.FTP_USERNAME_COM,
      password: process.env.FTP_PASSWORD_COM,
      port: 21,
    });
    //console.log(await client.list())
    await client.uploadFrom(file_to_upload, new_pathftppath);

    fs.rmSync(file_to_upload);
  } catch (err) {
    console.log(err);
  }
  client.close();
}
