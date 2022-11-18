App2 = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,
  lancé: false,

  init: function() {
    return App2.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App2.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App2.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App2.web3Provider);
    }
    return App2.initContract();
  },

  initContract: function() {
    $.getJSON("Election.json", function(election) {
      // Instancier un nouveau truffle contrat à partir des artfact
      App2.contracts.Election = TruffleContract(election);
      
      //Connecter le Provider pour interagir avec le contrat
      App2.contracts.Election.setProvider(App2.web3Provider);

      return App2.render();
    });
  },

  render: function() {
    var electionInstance;
    var loader2 = $("#loader2");
    var ajoutcandidat = $("#ajoutcandidat");

    loader2.show();
    ajoutcandidat.hide();
  

    // charger les donnée du compte
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App2.account = account;
        $("#accountAddress2").html("votre compte: <br>   " + account+ " <hr> <p>Administrateur</p>");
      }
    });
    
    App2.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.candidatesCount();
    }).then(function(candidatesCount) {
      var candidateslist = $("#candidateslist");
      candidateslist.empty();

      

      for (var i = 1; i <= candidatesCount; i++) {
        electionInstance.candidates(i).then(function(candidate) {
          var id = candidate[0];
          var name = candidate[1];
          var prénom= candidate[2];
          var daten= candidate[3];
          var voteCount = candidate[5];

          // Afficher la liste des candidats
          var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + prénom+ "</td><td>" + daten + "</td><td>" +voteCount + "</td></tr>"
          candidateslist.append(candidateTemplate);

          
        });
      }
      return electionInstance.voters(App2.account);
    }).then(function(hasVoted) {
      //ne pas permettre  l'utilisateur de voter
      
      loader2.hide();
      ajoutcandidat.show();
      
    }).catch(function(error) {
      console.warn(error);
    });   
    

    
    
  },

  Ajoutc: function() {
    var nom = document.getElementById("nomc").value;
    var prénom = document.getElementById("prénomc").value;
    var date = document.getElementById("datec").value;
    var adresse = document.getElementById("adressec").value;
    App2.contracts.Election.deployed().then(function(instance) {
      return instance.addCandidate(nom,prénom,date,adresse);
    }).then(function(result) {
      
      loader2.hide();
      ajoutcandidat.show();

    }).catch(function(err) {
      console.error(err);
    });
    function actualiser(){window.location.reload();}
    setTimeout(actualiser(), 10000);
  },

  lancervote: function(){
    window.location="timer.html";
    App2.lancé=true;

  }
  
};

$(function() {
  $(window).load(function() {
    App2.init();
  });
});