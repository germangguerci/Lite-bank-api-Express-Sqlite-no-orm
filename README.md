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

# Some features. 
- Add new account with user data, if user exist the new account will be linked to user, else a new user with the new account will be created. POST Add a new account
- Add founds to account: PUT devDeposit. 
- Transferencia: Post add new transfer. 
- Confirm transfer  (Transfer amount > $10.000): Post - Create pin / Put Confirm transfer. 
- Transfer history: Get - Get transfers
- User data, accounts and movements: Get - Get user info.  
