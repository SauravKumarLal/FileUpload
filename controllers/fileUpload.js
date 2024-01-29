//business logic
const File = require("../models/File");

//localFileUpload -> handler function -> client ke pc se data(img, vid, pdf, audio etc.) leke server ke path pe store karta hai
exports.localFileUpload = async (req, res) => {
    try{

        //fetch file
        const file = req.files.file;
        console.log(file);
        console.log("Naacho sadde, file aagyi -> ", file);

        //kis path pe file ko store karna hai on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`; //date.now avi ka date dega, so all file will have diff path
        console.log("PATH->", path);

        //add path to move fn..
        file.mv(path, (err) => {
            console.log(err);
        });

        //create a successful response
        res.json({
            success:true,
            message: "Local file uploaded successfully!",
        });
    }
    catch(error){
        console.log("Not able to upload the file on server");
        console.log(error);
    }
}
