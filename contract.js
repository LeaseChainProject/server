const path = require('path')
const url = require('url')

/* Web3/Eth setup */
const Web3 = require('web3');
const fs = require('fs');
const net = require('net');
/* constants */

const _pm_addr = '0x4d28F4e8982d89B86675724CEd3aD420c3f9b05b'
const _pm_pass = 'superfly'
const _gas_price = '55000000000'
const _gas = 1500000

var bytecode =  "0x6060604052341561000f57600080fd5b604051604080610ad883398101604052808051906020019091908051906020019091905050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600281905550806003819055505050610a45806100936000396000f300606060405260043610610078576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631695533d1461007d5780633e03ec20146101125780636ebf2242146101635780637fbe82391461019c57806399c89404146101ed578063fd9153a314610250575b600080fd5b610110600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506103a8565b005b341561011d57600080fd5b610149600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061064c565b604051808215151515815260200191505060405180910390f35b341561016e57600080fd5b61019a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061066c565b005b34156101a757600080fd5b6101d3600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061070a565b604051808215151515815260200191505060405180910390f35b34156101f857600080fd5b61020e600480803590602001909190505061072a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561025b57600080fd5b610287600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610769565b604051808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018060200180602001848152602001838103835286818151815260200191508051906020019080838360005b838110156103035780820151818401526020810190506102e8565b50505050905090810190601f1680156103305780820380516001836020036101000a031916815260200191505b50838103825285818151815260200191508051906020019080838360005b8381101561036957808201518184015260208101905061034e565b50505050905090810190601f1680156103965780820380516001836020036101000a031916815260200191505b50965050505050505060405180910390f35b6103b06108e9565b6006600115158160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16151514151561041057600080fd5b6080604051908101604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018581526020018481526020014281525091506007805480600101828161045e9190610934565b916000526020600020900160008460000151909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550508160046000846000015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001019080519060200190610558929190610960565b506040820151816002019080519060200190610575929190610960565b5060608201518160030155905050816000015173ffffffffffffffffffffffffffffffffffffffff167f8b08b6e27a5b23641b67ee785609d1b480b247ae468508deda4bb4d9c439415d8584606001516040518080602001838152602001828103825284818151815260200191508051906020019080838360005b8381101561060b5780820151818401526020810190506105f0565b50505050905090810190601f1680156106385780820380516001836020036101000a031916815260200191505b50935050505060405180910390a250505050565b60066020528060005260406000206000915054906101000a900460ff1681565b6001600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508073ffffffffffffffffffffffffffffffffffffffff167f3a3ecaf574390f4916b5710c1a5bf701fa52377e75974f389bb8c2f4fbfd0f1960405160405180910390a250565b60056020528060005260406000206000915054906101000a900460ff1681565b60078181548110151561073957fe5b90600052602060002090016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60046020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806001018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561083b5780601f106108105761010080835404028352916020019161083b565b820191906000526020600020905b81548152906001019060200180831161081e57829003601f168201915b505050505090806002018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108d95780601f106108ae576101008083540402835291602001916108d9565b820191906000526020600020905b8154815290600101906020018083116108bc57829003601f168201915b5050505050908060030154905084565b608060405190810160405280600073ffffffffffffffffffffffffffffffffffffffff16815260200161091a6109e0565b81526020016109276109e0565b8152602001600081525090565b81548183558181151161095b5781836000526020600020918201910161095a91906109f4565b5b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106109a157805160ff19168380011785556109cf565b828001600101855582156109cf579182015b828111156109ce5782518255916020019190600101906109b3565b5b5090506109dc91906109f4565b5090565b602060405190810160405280600081525090565b610a1691905b80821115610a125760008160009055506001016109fa565b5090565b905600a165627a7a72305820caa7f9fd81c4d9f8235af68b2bf6973dfb2b078a8b4ff3e078c60c2503879ebd0029"


var Abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_email",
				"type": "string"
			}
		],
		"name": "signLease",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "leaseApplicants",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_leaseApplicant",
				"type": "address"
			}
		],
		"name": "addApplicant",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "leaseSigned",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tenantList",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "tenants",
		"outputs": [
			{
				"name": "addr",
				"type": "address"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "email",
				"type": "string"
			},
			{
				"name": "leaseSignDate",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_rentalUnit",
				"type": "uint256"
			},
			{
				"name": "_rentalAmount",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_leaseApplicant",
				"type": "address"
			}
		],
		"name": "LeaseApplicantAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_tenant",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_name",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_signdate",
				"type": "uint256"
			}
		],
		"name": "LeaseSigned",
		"type": "event"
	}
]



// Keep a global reference to the web3 object for retaining connection

const init_eth = () => {
	var web3
	web3 = new Web3()
	web3.setProvider(new Web3.providers.IpcProvider("/home/altairmn/.ethereum/testnet/geth.ipc", net));
	web3.eth.personal.unlockAccount(_pm_addr, _pm_pass, 1000).then(console.log)
	return web3
}


/* ipc calls */
// ipc.on('create-lease-contract', function(event) {
//   fs.readFile('./src/assets/contracts/Lease.json', 'utf8', function(err, content) {
//     _leaseContract = JSON.parse(content)
//   });

//   event.sender.send('created-lease-contract')
// })


const create_contract = (web3, lease_contract) => {
	var leaseRent = "30"
	var _rentalUnit = "10"

	var leaseContract = new web3.eth.Contract(Abi)
	var _rentalAmount = web3.utils.toWei(leaseRent, 'ether')

		var lease = leaseContract.deploy({
				data: bytecode,
				arguments: [_rentalUnit, _rentalAmount]
		}).send({
				from: _pm_addr,
				gas: _gas,
				gasPrice: _gas_price 
		}, function(error, transactionHash) { 
			// event.sender.send('lease-broadcasted', transactionHash)
			console.log('TxHash : ' + transactionHash)
		}).on('error', 
				function(error) {
					// event.sender.send('error', error)
					console.log(error)
		}).on('transactionHash',
			function(transactionHash) {
				console.log("Transaction hash is: " + transactionHash)
		}).on('receipt', 
			function(receipt) {
			// event.sender.send('lease-receipt', receipt.contractAddress)
			console.log("Contract mined! Available at address: " + receipt.contractAddress) // contains the new contract address
		}).on('confirmation',
			function(confirmationNumber, receipt) { 
				console.log("Confirmation Number : " + confirmationNumber + " with receipt: " + receipt)
		}).then(function(newContractInstance) {
				leaseContract.options.address = newContractInstance.options.address;
				console.log(newContractInstance.options.address) // instance with the new contract address
				lease_contract.etherscan_link = newContractInstance.options.address
				lease_contract.save(function(err) {
					if(err) console.log(err);
				});
		});

}



export { create_contract as CreateContract}