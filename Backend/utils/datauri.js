import DataUriParser from "datauri/parser.js"
import path from "path"

// datauri/parser ek Node.js package hai jo kisi bhi file ya buffer ko Data URI format me convert karta hai. Data URI ek base64
//  encoded string hoti hai jo kisi bhi file (image, text, PDF, audio, etc.) ko bina external storage ke directly HTML ya API me use karne ki facility deti hai.
const getDataUri = (file) => {
    const parser = new DataUriParser(); // Create a new instance of the parser
    const extName = path.extname(file.originalname).toString(); // Extract file extension
    return parser.format(extName, file.buffer); // Convert file buffer into Data URI
}
export default getDataUri;