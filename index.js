const shell = require('shelljs')
const fs = require("fs");

const solc = require('solc');
const smtchecker = require('solc/smtchecker');
const smtsolver = require('solc/smtsolver');


function solidity_compile(contract){
    
// Note that this example only works via node and not in the browser.


// compatibility of solidity version
// assert targets in sol file

    var input = {
    "language": 'Solidity',
    "sources": {
      'Ballot.sol': {
        content: fs.readFileSync(contract).toString('utf8')
        //content: 'contract C { function f(uint x) public { assert(x > 0); } }'
        }
    },
    "settings": {
      "modelChecker": {
        "engine": "chc",
        "invariants": ["contract", "reentrancy"],
        "showUnproved": true,
        "solvers": [ "cvc4", "smtlib2", "z3" ],
        "targets": ["assert"],
        "timeout": 3600
      }
    }
  };

  
  var output = JSON.parse(
    solc.compile(
      JSON.stringify(input),
      { smtSolver: smtchecker.smtCallback(smtsolver.smtSolver, smtsolver.availableSolvers[0]) }
    )
  );

    return output;
}

function asserter(contract){
    
    console.log("hello")
    // Dres1=$(date +%s.%N)
    var dtD = 0;

    if(contract == ""){
        shell.echo("Error: Please provide the name of Smart Contract under verification.");
        return;
    }

    console.log("hello")
    contractFileName = contract + ".sol"
    rmvdCmntFile = contract + "_wdoutcmnt.sol"

    
    if(!shell.find(contractFileName)){
        shell.echo("Error: Given file doesn't exist.");
        return;
    }

    results_name = "./Results/" + contract;
    fs.access(results_name, function(error) {
        if (error) {
          shell.mkdir(results_name);
        } 
      })
    
    SainitizedContract = contract + "_Sanitized.sol";
    InterMediateFile = contract + "_Intermediate.sol";

    shell.exec("g++ Comment_Remover.cpp -o .cmntrmv")
    
    shell.exec("./.cmntrmv " + contract)
    
    shell.exec("rm " + InterMediateFile)

    shell.exec("mv " + SainitizedContract + " ./Results/" + contract + "/" + contractFileName);

    console.log("hello")
    // cp $contractFileName ./Results/$1/$contractFileName

    shell.exec("g++ assertionInjector.cpp -o .assertinserter");

    console.log("hello")
    modifiedFile = contract + "_mod.sol";
    resultFile = contract + "_output.txt";

    //timeout 3600 solc ./Results/$1/$modifiedFile --model-checker-engine bmc --model-checker-targets assert &>./Results/$1/$resultFile 
    //outputCompiler = solidity_compile("./Results/" + contract + "/" + contractFileName);
    outputCompiler = solidity_compile("./Ballot_mod.sol")
    //ne();
    console.log(outputCompiler)
}

asserter("Ballot")