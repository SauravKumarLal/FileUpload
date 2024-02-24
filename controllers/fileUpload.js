//business logic
const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

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

function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality){
    const options = {
        folder: folder,
        resource_type: "auto",
        
        // these 3 lines will help to keep the original filename in the database
        public_id: file.name,
        use_filename: true,
        unique_filename: false
    };
    console.log("temp file path", file.tempFilePath);

    if(quality){
        options.quality = quality;
    }
    // options.resourse_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}



//image upload ka handler
exports.imageUpload = async(req, res) => {
    try{
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type: ", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            })
        }

        //file format supported
        //console.log("Uploading to codehelp");
        const response = await uploadFileToCloudinary(file, "fileupload_backend");
        console.log(response);
        //db mai entry save krni hai
        const fileData = await File.create({
            name,
            tags, 
            email,
            imageUrl: response.secure_url,
        })
        
        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image successfully uploaded",

        })
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success: false,
            message: 'Something went wrong',
        });
    }
}



//video upload ka handler
exports.videoUpload = async(req, res) => {
    try{
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);
        
        const file = req.files.videoFile;
        console.log(file);
        
        //valodation
        const supportedTypes = ["mp4", "mkv", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type: ", fileType);
        
        //TODO: add an upper limit of 5MB
        
        
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            })
        }
        
        //now, file types supported
        console.log("Uploaded to fileupload_backend");
        const response = await uploadFileToCloudinary(file, "fileupload_backend");
        console.log(response);
        
        const fileData = await File.create({
            name,
            tags, 
            email,
            imageUrl: response.secure_url,
        });
        
        res.json({
            success: true,
            videoUrl: response.secure_url,
            message: "Video successfully uploaded",
        })
        
    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message: 'Something went wrongg'
        });
    }
}

exports.imageSizeReducer = async(req, res) => {
    try{
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type: ", fileType);



        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            })
        }

        //file format supported
        //console.log("Uploading to codehelp");
        const response = await uploadFileToCloudinary(file, "fileupload_backend", 30);
        console.log(response);

        //db mai entry save krni hai
        const fileData = await File.create({
            name,
            tags, 
            email,
            imageUrl: response.secure_url,
        })
        
        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image successfully uploaded",
        })
    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message: 'Something went wrongg'
        });
    }
}