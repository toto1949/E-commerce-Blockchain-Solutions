pragma solidity 0.4.24;

contract Election {
    // Model d'un candidat
    struct Candidate {
        uint id;
        string name;
        string fname;
        string date;
        string adresse;
        uint voteCount;
    }

    // enregistrer les comptes qui ont déja voté
    mapping(address => bool) public voters;
    // enregistrer et chercher un candidat
    mapping(uint => Candidate) public candidates;
    // enregistrer le nombre de candidats
    uint public candidatesCount;

    
    //  event VOTE
    event votedEvent ( uint indexed _candidateId);


    function addCandidate (string _name,string _fname,string _date,string _adresse ) public {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name,_fname,_date,_adresse, 0);
    }

    function vote (uint _candidateId) public {

        // require qu'il n'as pas déja voté 
        require(!voters[msg.sender]);

        // require un candidat valid 
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // enregistrer un electeur qui a voté
        voters[msg.sender] = true;

        // Mise à jour les voies d'un candidat
        candidates[_candidateId].voteCount ++;

        // Déclancher voted event
       emit votedEvent(_candidateId);

       // une autre candition doit ëtre ajouté (require (votelancé =true))

    }
       
}
