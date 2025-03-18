import MongoDBDao from "./mongoDBDao.js";
import MemoryDao from "./memoryDao.js";
import FileSystemDao from "./fileSystemDao.js";
import config from "../config/config.js";

let DAO; 

switch(config.persistence) {
    case "mongo":
        DAO = MongoDBDao;
        break; 
    case "memory":
        DAO = MemoryDao;
        break;
    case "file":
        DAO = FileSystemDao;
        break; 
    default: 
        throw new Error("No valido"); 
}

export default DAO; 