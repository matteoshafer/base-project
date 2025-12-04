// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title FrenBase
 * @notice Simple onchain storage for swipes and matches
 * @dev Can be used as an alternative to Vercel KV for fully onchain storage
 */
contract FrenBase {
    struct Swipe {
        uint256 fromFid;
        uint256 toFid;
        bool isFren; // true for fren, false for pass
        uint256 timestamp;
        bool isSuperFren;
    }

    struct Match {
        uint256 fid1;
        uint256 fid2;
        uint256 matchNumber;
        uint256 timestamp;
        string nftTokenId;
    }

    mapping(bytes32 => Swipe) public swipes;
    mapping(bytes32 => Match) public matches;
    mapping(uint256 => uint256) public userMatchCounts;
    
    uint256 public matchCounter;
    
    event SwipeRecorded(
        uint256 indexed fromFid,
        uint256 indexed toFid,
        bool isFren,
        uint256 timestamp
    );
    
    event MatchCreated(
        uint256 indexed fid1,
        uint256 indexed fid2,
        uint256 matchNumber,
        uint256 timestamp
    );

    /**
     * @notice Record a swipe action
     * @param fromFid The FID of the user making the swipe
     * @param toFid The FID of the user being swiped on
     * @param isFren True if fren, false if pass
     * @param isSuperFren True if super fren
     */
    function recordSwipe(
        uint256 fromFid,
        uint256 toFid,
        bool isFren,
        bool isSuperFren
    ) external {
        bytes32 key = keccak256(abi.encodePacked(fromFid, toFid));
        
        swipes[key] = Swipe({
            fromFid: fromFid,
            toFid: toFid,
            isFren: isFren,
            timestamp: block.timestamp,
            isSuperFren: isSuperFren
        });
        
        emit SwipeRecorded(fromFid, toFid, isFren, block.timestamp);
        
        // Check for match if both swiped fren
        if (isFren) {
            bytes32 reverseKey = keccak256(abi.encodePacked(toFid, fromFid));
            Swipe memory reverseSwipe = swipes[reverseKey];
            
            if (reverseSwipe.isFren && 
                block.timestamp - reverseSwipe.timestamp < 1 days) {
                _createMatch(fromFid, toFid);
            }
        }
    }

    /**
     * @notice Create a match between two users
     * @param fid1 First user's FID
     * @param fid2 Second user's FID
     */
    function _createMatch(uint256 fid1, uint256 fid2) internal {
        matchCounter++;
        
        bytes32 matchKey = keccak256(abi.encodePacked(fid1, fid2));
        
        matches[matchKey] = Match({
            fid1: fid1,
            fid2: fid2,
            matchNumber: matchCounter,
            timestamp: block.timestamp,
            nftTokenId: ""
        });
        
        userMatchCounts[fid1]++;
        userMatchCounts[fid2]++;
        
        emit MatchCreated(fid1, fid2, matchCounter, block.timestamp);
    }

    /**
     * @notice Get a swipe record
     */
    function getSwipe(
        uint256 fromFid,
        uint256 toFid
    ) external view returns (Swipe memory) {
        bytes32 key = keccak256(abi.encodePacked(fromFid, toFid));
        return swipes[key];
    }

    /**
     * @notice Get a match record
     */
    function getMatch(
        uint256 fid1,
        uint256 fid2
    ) external view returns (Match memory) {
        bytes32 matchKey = keccak256(abi.encodePacked(fid1, fid2));
        return matches[matchKey];
    }

    /**
     * @notice Get match count for a user
     */
    function getMatchCount(uint256 fid) external view returns (uint256) {
        return userMatchCounts[fid];
    }
}

