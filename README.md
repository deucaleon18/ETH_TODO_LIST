# ETH_TODO_LIST
A simple todo list built with Solidity to manage the backend running on local Blockchain Ganache and frontend handled by React Js

# Dependencies
## Install these prerequisites to follow along with the tutorial. See free video tutorial or a full explanation of each prerequisite.

NPM: [https://nodejs.org](https://nodejs.org)<br/>
Truffle: [https://github.com/trufflesuite/truffle](https://github.com/trufflesuite/truffle)<br/>
Ganache: [http://truffleframework.com/ganache/](http://truffleframework.com/ganache/)<br/>
Metamask: [https://metamask.io/](https://metamask.io/)<br/>

## Step 1. Clone the project<br/>
```
git clone https://github.com/deucaleon18/ETH_TODO_LIST
```

## Step 2. Install dependencies<br/>
```  
cd ETH_TODO_LIST/client
npm install
```
<br/>
   


## Step 3. Start Ganache
Open the Ganache GUI client that you downloaded and installed. This will start your local blockchain instance.


## Step 4. Compile & Deploy Election Smart Contract<br/>
```  
truffle migrate --reset
```
<br/>
You must migrate the solidity smart contract each time your restart ganache. 


## Step 5. Configure Metamask
See free video tutorial for full explanation of these steps:


## Unlock Metamask
Connect metamask to your local Etherum blockchain provided by Ganache.
Import an account provided by ganache.


## Step 6. Run the Front End Application
``` 
npm run dev
``` 
Visit this URL in your browser: http://localhost:3000`

### Project also deployed [here](http://eth-todo-list.vercel.app/)

![ethlist1](https://user-images.githubusercontent.com/77899467/133526665-38b33d46-99b0-45e5-a974-68092bef3f8d.png)


