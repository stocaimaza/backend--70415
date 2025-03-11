// function operacionCompleja() {
//     let resultado = 0; 

//     for(let i = 0; i < 5e9; i++) {
//         resultado += i;
//     }
//     return resultado;
// }

////Lo voy a modificar para que se ejecute solo cuando el padre lo pida, buenisimo, genial.. jajaja

process.on("message",  message => {
    let resultado = 0; 

    for(let i = 0; i < 5e9; i++) {
        resultado += i;
    }
    process.send(resultado); 
})