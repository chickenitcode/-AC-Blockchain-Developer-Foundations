//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRegistry{
    struct Student{
        string name;
        uint age;
        bool isRegistered;
    }

    mapping(address => Student) public students;

    function register(string memory name, uint age) public{
        students[msg.sender] = Student(name, age, true);
    }

    function getStudent(address user) public view returns (string memory, uint, bool){
        Student memory s = students[user];
        return (s.name, s.age, s.isRegistered);
    }

    function isRegistered(address user) public view returns (bool){
        return students[user].isRegistered;
    }

}