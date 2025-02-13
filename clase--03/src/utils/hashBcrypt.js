//Bcrypt es una libreria de hashing de contraseñas. 

//1) Instalamos: npm install bcrypt
//2) Importamos el módulo: 

import bcrypt from "bcrypt"; 

//Se crearan dos funciones: 
//a) createHash: aplica el hash al password. 
//b) isValidPassword: compara el password proporcionado por la base de datos. 

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10)); 

//hashSync(): toma el password que le pasamos y aplica el proceso a partir de un salt. 

//"salt" es un string random que hace que el proceso de hasheo se realice de forma impredecible. 

//En este caso generamos un salt de 10 caracteres. 


export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password); 


//Compara los password y me retorna true / false segun corresponda. 



