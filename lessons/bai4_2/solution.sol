// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRegistryV2{
    struct Student{
        string name;
        uint age;
        bool isRegistered;
    }

    mapping(address => Student) public students;
    address public owner;

    event StudentRegistered (address indexed student, string name, uint age);

    modifier onlyOwner(){
        require(msg.sender == owner, "Only owner can add student");
        _;
    }
    constructor(){
        owner = msg.sender;
    }

    function registerStudent(address studentAddr, string memory name, uint age) public onlyOwner {
        students[studentAddr] = Student(name, age, true);
        emit StudentRegistered(studentAddr, name, age);
    }

    function getStudent(address user) public view returns (string memory, uint, bool){
        Student memory s = students[user];
        return (s.name, s.age, s.isRegistered);
    }

    function isStudentRegistered(address user) public view returns (bool){
        return students[user].isRegistered;
    }

}