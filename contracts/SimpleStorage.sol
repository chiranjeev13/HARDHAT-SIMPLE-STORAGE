//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract SimpleStorage 
{
    uint256 favnum;
    mapping(string => uint256) public nameTofavnum;
    struct People {
        uint256 favnum;
        string name;
    }
    People[] public person;

    function store(uint256 _favnum) public virtual {
        favnum = _favnum;
    }

    function retrieve() public view returns (uint256) {
        return favnum;
    }

    function add(string calldata _name, uint256 _favnum) public {
        person.push(People(_favnum, _name));
        nameTofavnum[_name] = _favnum;
    }
}
