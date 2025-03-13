import multer from "multer";

//Iamges upload karne ke liye kam me aaata he 
const storage = multer.memoryStorage();
export const singleUpload = multer({storage}).single("file");