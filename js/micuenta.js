
/*
function controlEmail () {
        if (ingresarEmail.indexOf("@") <=0) {
            return false;
        }

        alert("El email ingresado no es válido")
        return (true)}   
     */



function controlEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(ingresarEmail)) {
        return (true)
    }
    alert("El email ingresado no es válido")
    return (false)
}

const emails = []

const contraseñas = []

let ingresarEmail = prompt("Por favor ingresa tu email")

controlEmail(ingresarEmail)

emails.push(ingresarEmail)

if (controlEmail == false) {
    emails.splice(ingresarEmail, 1)
}

console.log(emails)


while (controlEmail != false) {

    let regPassword = prompt("Ingresa tu contraseña");
    contraseñas.push(regPassword)
    console.log(contraseñas)

    let repPassword = prompt("Confirmar contraseña")

    if (repPassword == regPassword) {
        break;
    } else if (repPassword != regPassword) {
        if (repPassword != regPassword) {
            contraseñas.splice(regPassword, 1)
        }
        continue;
    }
}



