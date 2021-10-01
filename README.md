# api-bancaria
Bank api.

# entity-relation diagram
![entity-relation](./api-bancaria-entidad-relacion.drawio.png?raw=true "DB")

# Api documentation

- [Api documentation](https://documenter.getpostman.com/view/12146233/UUy386Y2)
- Avaiable postman_collection in ./api-bancaria.postman_collection.json

# About money value
$10.000,00 = 1000000 (fixed point decimals)


# Start server
With NodeJS installed, you can start the server by running,

```
npm install
npm start
```
Server will be available at http://localhost:3000

# Important!
This is a simple mvp / poc development api, it is far away from being production-ready.

# Alcance
La presente API fue desarrolla durante 32hs, no contempla los requisitos adicionales mas allá de la base de datos. 
Por una cuestión de tiempo, los valores no son validados en su totalidad (No hay chequeo de tipos), por lo que, si se prueba
con valores distintos a los esperados (ver documentación) puede fallar. 

# Posible flujo de prueba
- Creación de usuario / cuenta: POST - Add new account. 
- Creacion de segunda cuenta con el mismo usuario u nuevo usuario y cuenta. POST - Add new account.
- Deposito de fondos: PUT devDeposit. 
- Transferencia: Post add new transfer. 
- Confirmacion de transferencia (Mayor a $10.000) Post - Create pin / Put Confirm transfer. 
- Historial de transferencias: Get - Get transfers
- Datos del usuario, cuentas y movimientos de los ultimos 5 dias: Get - Get user info.  