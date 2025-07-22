//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting{
    struct Candidate{
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public hasVoted;
    address public owner;
    uint public candidateCount;

    event Voted(address voter, uint candidateId);

    modifier onlyOwner(){
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    constructor(){
        owner = msg.sender;
        candidateCount = 0;
    }

    function addCandidate(string memory name) public onlyOwner{
        candidateCount++;
        candidates[candidateCount] = Candidate(name, 0);
    }

    function vote(uint candidateId) public{
        require(!hasVoted[msg.sender], "You have already voted");
        require(candidateId > 0 && candidateId <= candidateCount, "Invalid candidate ID");

        hasVoted[msg.sender] = true;
        candidates[candidateId].voteCount++;

        emit Voted(msg.sender, candidateId);
    }

    function getCandidate(uint candidateId) public view returns (string memory, uint){
        require(candidateId > 0 && candidateId <= candidateCount, "Invalid candidate ID");
        Candidate memory candidate = candidates[candidateId];
        return (candidate.name, candidate.voteCount);
    }

}