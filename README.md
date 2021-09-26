# api-bancaria
Api bancaria, examen técnico Back end Developer.

Agregar status a la tabla de transferencias. 


Endpoints: 

Account: 

POST - Creacion de cuenta (userId, dolar: bool) : {
 nrodecuenta 
 cbu
 nrodecuentaDolares
 cbuDolares
 ...cuentaprops
}

PUT - Asignacion de pin a cuenta (accounId, pin) : {
succesMessage
}

Transfer: 
//Va a ser necesario pensar una logica jwt
POST - transferencia(CBU, ammount): {
 datosTicket || transfer_id
}

POST - transferenciaMayor(transferId, pin): {
 datosTicket
}

User: 

GET - userInfo: {
userfields,
balanceHistory
}

GET - transferHistory(fromDate, toDate, page){
transferencias: [transferencias]
}

POST deposito(cbu, ammount) {
 accountBalance
}

POST compraDolar(ammount){
 accountBalance
}

FixedDeposit:
POST crearPlazo(fromDate, toDate, ammount)

POST cancelarPlazoFijo

