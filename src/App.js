
import { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'
import Token from './artifacts/contracts/Token.sol/Token.json'

const greeterAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
const tokenAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"

function App() {

  const [greeting, setGreetingValue] = useState('')
  const [userAccount, setUserAccount] = useState('') // person we want to send tokens to
  const [amount, setAmount] = useState(0) // amount of tokents we want to send

  // take info from the account from metamask
  async function requestAccount(){
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }


  // see if we are connected, then get an array of accounts (we only have one in our case)
  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
      const balance = await contract.balanceOf(account);
      console.log("Balance: ", balance.toString());
    }
  }


  // make sure that we have access to the wallet, then create a signer to sign the transaction, create new instance of the contract,
  // then pass the account we want to send and the ammount, wait to the transaction and log the results
  async function sendCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transaction = await contract.transfer(userAccount, amount);
      await transaction.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }


  // see if metamask is installed (window.ethereum), then we create a provider and a instance of the contract.
  // with contract.greet we take the value the value we are reading from the blockchain.
  async function fetchGreeting(){
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      console.log({ provider })
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
      try {
        const data = await contract.greet()
        console.log('data: ', data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }    
  }

  // check if there is a greeting, check if window.ethereum is there, then we take the info from the account, we take the provider,
  // we sign the transaction with the signer, we get a new instance of the contract (at this time we use the signer)
  // we create the transaction with the greeting variable (local) and we wait to the transaction is confirmed in the blockchain.
  // then we call fetchGreeting to logout the new value
  async function setGreeting(){
    if (!greeting) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider })
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(greeting)
      setGreetingValue('') // set local value to empty string
      await transaction.wait()
      fetchGreeting()
    }
  }

  return (
    <div className="App">
      <header className="App-header">
      <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input onChange={e => setGreetingValue(e.target.value)} placeholder="Set greeting" value={greeting}/>

        

        <button onClick={getBalance}>Get Balance</button>
        <button onClick={sendCoins}>Send Coins</button> 
        <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
        <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />
      </header>
    </div>
  );
}

export default App;
