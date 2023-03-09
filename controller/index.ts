import * as SecureStore from 'expo-secure-store';

import { fetch as fetchPolyfill } from 'whatwg-fetch'
global.fetch = fetchPolyfill

//Function Saved nameUser 
async function saveNameUser(data: string){
    try {
        console.log(await SecureStore.setItemAsync('storageNameUser', data));
    } catch (e) {
        console.log(e);
    }
}

//Read nameUser 
async function readNameUser(){
    //Get Key
    try {
        const key = await SecureStore.getItemAsync('storageNameUser')
        return key 
    } catch (e) { 
        console.log(e);
    }
}
//Function Saved Password 
async function savePassword(data: any){
    try {
        console.log(await SecureStore.setItemAsync('storagePassword', data));
    } catch (e) {
        console.log(e);
    }
}

//Read Password 
async function readPassword(){
    //Get Key
    try {
        const key = await SecureStore.getItemAsync('storagePassword')
        return key 
    } catch (e) { 
        console.log(e);
    }
}

//Function Saved Mnemonic
async function saveMmemonic(data: any){
    try {
        console.log(await SecureStore.setItemAsync('storageMnemonic', data));
    } catch (e) {
        console.log(e);
    }
}

//Read Mnemonic
async function readMnemonic(){
    //Get Key
    try {
        const key = await SecureStore.getItemAsync('storageMnemonic')
        return key 
    } catch (e) { 
        console.log(e);
    }
}

//Function save PublicKey
async function savePublicKey(data: any){
    try {
        console.log(await SecureStore.setItemAsync('storagePublicKey', data));
    } catch (e) {
        console.log(e);
    }
}

//Read PublicKey
async function readPublicKey(){
    //Get Key
    try {
        const key = await SecureStore.getItemAsync('storagePublicKey')
        return key 
    } catch (e) { 
        console.log(e);
    }
}

//Function save PrivateKey
async function savePrivateKey(data: any){
    try {
        console.log(await SecureStore.setItemAsync('storagePrivateKey', data));
    } catch (e) {
        console.log(e);
    }
}

//Read PrivateKey
async function readPrivateKey(){
    //Get Key
    try {
        const key = await SecureStore.getItemAsync('storagePrivateKey')
        return key 
    } catch (e) { 
        console.log(e);
    }
}

//History Transfer Sol
async function getSolHistory(publicKey: string, limit: number) {
    var transactionss : any = []
    const solanaLamports = 1000000000
    const response = await fetch(`https://public-api.solscan.io/account/solTransfers?account=${publicKey}&offset=0&limit=${limit}`)
    const transactions = await response.json();
    for (let i = 0; i < limit; i++) {
        if (transactions.data[i].src == publicKey) {
            const obj = {
                            id: i, 
                            confirmation: 'Envia', 
                            signature: transactions.data[i].txHash, 
                            amount: Number(transactions.data[i].lamport)/solanaLamports,
                            token: transactions.data[i].tokenAddress,
                            owner: transactions.data[i].owner
                        }
            transactionss.push(obj);
        } else {
            const obj = {
                            id: i, 
                            confirmation: 'Recibe', 
                            signature: transactions.data[i].txHash, 
                            amount: Number(transactions.data[i].lamport)/solanaLamports,
                            token: transactions.data[i].tokenAddress,
                            owner: transactions.data[i].owner
                        }
            transactionss.push(obj);
        }
    }
    return transactionss
}


//History Transfer SPL
async function getSPLHistory(account: string, limit: number) {
    var transactionss : any = []
    const USDTLamports = 1000000
    const response = await fetch(`https://public-api.solscan.io/account/splTransfers?account=${account}&offset=0&limit=${limit}`)
    const transactions = await response.json();
    

    for (let i = 0; i < limit; i++) {
        if (Number(transactions.data[i].changeAmount)/USDTLamports > 0) {
            
          const obj = { 
                        id: i,
                        confirmation: 'Recibe', 
                        signature: transactions.data[i].signature[0], 
                        amount: Number(transactions.data[i].changeAmount)/USDTLamports,
                        token: transactions.data[i].tokenAddress,
                        owner: transactions.data[i].owner
                    }
          transactionss.push(obj)
        } else {
          const obj = {
                        id: i,
                        confirmation: 'Envia', 
                        signature: transactions.data[i].signature[0], 
                        amount: Number(transactions.data[i].changeAmount)/USDTLamports,
                        token: transactions.data[i].tokenAddress,
                        owner: transactions.data[i].owner
                    }
          transactionss.push(obj)
        }
    }
    return transactionss
}

//get Spl and Sol History Transfer
async function getSplandSolHistory(publicKey: string, limit: number) {
    var transactionss : any = []
    const solanaLamports = 1000000000
    const USDTLamports = 1000000
    const response = await fetch(`https://public-api.solscan.io/account/solTransfers?account=${publicKey}&offset=0&limit=${limit}`)
    const transactions = await response.json();
    const response2 = await fetch(`https://public-api.solscan.io/account/splTransfers?account=${publicKey}&offset=0&limit=${limit}`)
    const transactions2 = await response2.json();

    for (let i = 0; i < limit; i++) {
        //Sol
        if (transactions.data[i].src == publicKey) {
            const obj = {
                            id: i, 
                            confirmation: 'Envia', 
                            signature: transactions.data[i].txHash, 
                            amount: Number(transactions.data[i].lamport)/solanaLamports,
                            token: transactions.data[i].tokenAddress,
                            owner: transactions.data[i].owner
                        }
            transactionss.push(obj);
        } else {
            const obj = {
                            id: i, 
                            confirmation: 'Recibe', 
                            signature: transactions.data[i].txHash, 
                            amount: Number(transactions.data[i].lamport)/solanaLamports,
                            token: transactions.data[i].tokenAddress,
                            owner: transactions.data[i].owner
                        }
            transactionss.push(obj);
        }
        //Spl
        if (Number(transactions2.data[i].changeAmount)/USDTLamports > 0) {
            
            const obj = { 
                          id: i,
                          confirmation: 'Recibe', 
                          signature: transactions2.data[i].signature[0], 
                          amount: Number(transactions2.data[i].changeAmount)/USDTLamports,
                          token: transactions2.data[i].tokenAddress,
                          owner: transactions2.data[i].owner
                      }
            transactionss.push(obj)
          } else {
            const obj = {
                          id: i,
                          confirmation: 'Envia', 
                          signature: transactions2.data[i].signature[0], 
                          amount: Number(transactions2.data[i].changeAmount)/USDTLamports,
                          token: transactions2.data[i].tokenAddress,
                          owner: transactions2.data[i].owner
                      }
            transactionss.push(obj)
          }
        
    }

    return transactionss
}

//History Transfer Spl to Currency
async function getSPLHistoryCurrency(account: string, limit: number, address: string) {
    var transactionss : any = []
    const USDTLamports = 1000000
    const response = await fetch(`https://public-api.solscan.io/account/splTransfers?account=${account}&offset=0&limit=${limit}`)
    const transactions = await response.json();

    for (let i = 0; i < limit; i++) {
        
        if (address == transactions.data[i].tokenAddress) {
            if (Number(transactions.data[i].changeAmount)/USDTLamports > 0) {
                const obj = { 
                                id: i,
                                confirmation: 'Recibe', 
                                signature: transactions.data[i].signature[0], 
                                amount: Number(transactions.data[i].changeAmount)/USDTLamports,
                                token: transactions.data[i].tokenAddress,
                                owner: transactions.data[i].owner
                            }
                transactionss.push(obj)
            } else {
                const obj = {
                        id: i,
                        confirmation: 'Envia', 
                        signature: transactions.data[i].signature[0], 
                        amount: Number(transactions.data[i].changeAmount)/USDTLamports,
                        token: transactions.data[i].tokenAddress,
                        owner: transactions.data[i].owner
                }
                transactionss.push(obj)
            }
        }
    }
    return transactionss
}

async function getPrices() {
    try {
        const solana = await fetch(`https://public-api.birdeye.so/public/price?address=So11111111111111111111111111111111111111112`)
        const solanaResponse = await solana.json()
        const solanaPrice = solanaResponse.data.value
        
        const ether = await fetch(`https://public-api.birdeye.so/public/price?address=2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk`)
        const etherResponse = await ether.json()
        const etherPrice = etherResponse.data.value
    
        const prices = {
            "solana" : solanaPrice,
            "ethereum" : etherPrice
        }
        return prices
    } catch (error) {
        console.log(error);
    }
}

////////////////////////////////////////////////////////////
//  Funciones de Solana-web3 para la creacion de cuentas  //
////  obtener el balance y transferir SOL y SPL Tokens  ////
////////////////////////////////////////////////////////////

//generar mnemonic
async function generateMnemonic() {
    const response = await fetch(`https://genesyswallet.com/api/mnemonic`)
    const text = await response.text()
    saveMmemonic(text)
    return text
}

//crear cuenta
//Funcion que convierte las 12 palabras a un keypair
async function keypair(mnemonic:string) {

    try {
        
        const response = await fetch('https://genesyswallet.com/api/keypair', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mnemonic:mnemonic,
            })
          }) 
        const keypair = await response.json()
        //saving keys
        savePublicKey(keypair.public_key)
        savePrivateKey(keypair.secret_key)

    } catch (error) {
        console.log(error)
    }  
}

//obtener balance sol
async function getSolanaBalance(pubKey: string) {
    const response = await fetch(`https://genesyswallet.com/api/getSolBalance/${pubKey}`)
    const balance = await response.json()
    return balance.balance.toString()
}

//obtener balance spl
async function getSplBalance(pubKey: string, splMint: string) {
    const response = await fetch(`https://genesyswallet.com/api/getBalanceSPL/${pubKey}/${splMint}`)
    const balance = await response.json()
    console.log(balance);
    if (balance.balance) {
        return balance.balance.toString()
    } else {
        return "0.0"
    }
}

//enviar sol 
// async function sendSoles(mnemonic: string, toPublicKey: string, amount: number){
//     const response = await fetch(`https://genesyswallet.com/send_transaction/${mnemonic}/${toPublicKey}/${amount}`)
//     const text = await response.text()
//     return text
// }

//Enviar Sol
async function sendSoles(secretKey:string, toPublic:string, amount:number) {

    try {
        
        const response = await fetch('https://genesyswallet.com/api/sendSol', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                secretKey:secretKey,
                toPublicKey:toPublic,
                amount:amount,
            })
          })
    
        const json = await response.text()
        return json

    } catch (error) {
        return error
    }  
}

// //enviar spl
// async function sendSPL(mnemonic: string, toPublicKey: string, amount: number, mint: string){
//     const response = await fetch(`https://genesyswallet.com/send_transaction_spl/${mnemonic}/${toPublicKey}/${amount}/${mint}`)
//     const text = await response.text()
//     return text
// }
 
//Enviar Solanas
async function sendSPL(secretKey:string, toPublic:string, amount:number, mint:string) {

    try {
        
        const response = await fetch('https://genesyswallet.com/api/sendTokens', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                secretKey:secretKey,
                toPublicKey:toPublic,
                amount:amount,
                mint:mint,
            })
          })
    
        const json = await response.text()
        console.log(json)
        return json

    } catch (error) {
        console.log(error)
       }  
}

async function getNfts(pubKey: string) {
    const response = await fetch(`https://genesyswallet.com/api/getNfts/${pubKey}`);
    const nfts = await response.json();
    return nfts
}

//traer eventos 
async function getEvents() {
    const response = await fetch('https://genesyswallet.com/xolarix-disco/getAllEvents')
    const json = await response.json()
    return json 
}
  

export {
    saveMmemonic,
    readMnemonic,
    generateMnemonic,
    savePassword,
    readPassword,
    getSPLHistory,
    getSolHistory,
    saveNameUser,
    readNameUser,
    keypair,
    readPrivateKey,
    readPublicKey,
    getSolanaBalance,
    getSplBalance,
    getPrices,
    sendSoles,
    sendSPL,
    getNfts, 
    getEvents,
    getSPLHistoryCurrency,
    getSplandSolHistory
}