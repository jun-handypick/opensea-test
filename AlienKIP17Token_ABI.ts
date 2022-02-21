export default [
    {
        constant: true,
        inputs: [{ name: "interfaceId", type: "bytes4" }],
        name: "supportsInterface",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "view",
        type: "function",
        signature: "0x01ffc9a7",
    },
    {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function",
        signature: "0x06fdde03",
    },
    {
        constant: true,
        inputs: [{ name: "tokenId", type: "uint256" }],
        name: "getApproved",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function",
        signature: "0x081812fc",
    },
    {
        constant: false,
        inputs: [
            { name: "to", type: "address" },
            { name: "tokenId", type: "uint256" },
        ],
        name: "approve",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
        signature: "0x095ea7b3",
    },
    {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
        signature: "0x18160ddd",
    },
    {
        constant: false,
        inputs: [
            { name: "from", type: "address" },
            { name: "to", type: "address" },
            { name: "tokenId", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
        signature: "0x23b872dd",
    },
    {
        constant: true,
        inputs: [
            { name: "owner", type: "address" },
            { name: "index", type: "uint256" },
        ],
        name: "tokenOfOwnerByIndex",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
        signature: "0x2f745c59",
    },
    {
        constant: false,
        inputs: [],
        name: "unpause",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
        signature: "0x3f4ba83a",
    },
    {
        constant: false,
        inputs: [
            { name: "from", type: "address" },
            { name: "to", type: "address" },
            { name: "tokenId", type: "uint256" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
        signature: "0x42842e0e",
    },
    {
        constant: true,
        inputs: [{ name: "account", type: "address" }],
        name: "isPauser",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "view",
        type: "function",
        signature: "0x46fbf68e",
    },
    {
        constant: true,
        inputs: [{ name: "index", type: "uint256" }],
        name: "tokenByIndex",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
        signature: "0x4f6ccce7",
    },
    {
        constant: true,
        inputs: [],
        name: "paused",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "view",
        type: "function",
        signature: "0x5c975abb",
    },
    {
        constant: true,
        inputs: [{ name: "tokenId", type: "uint256" }],
        name: "ownerOf",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function",
        signature: "0x6352211e",
    },
    {
        constant: false,
        inputs: [],
        name: "renouncePauser",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
        signature: "0x6ef8d66d",
    },
    {
        constant: true,
        inputs: [{ name: "owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
        signature: "0x70a08231",
    },
    {
        constant: false,
        inputs: [{ name: "account", type: "address" }],
        name: "addPauser",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
        signature: "0x82dc1ec4",
    },
    {
        constant: false,
        inputs: [],
        name: "pause",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
        signature: "0x8456cb59",
    },
    {
        constant: true,
        inputs: [],
        name: "symbol",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function",
        signature: "0x95d89b41",
    },
    {
        constant: false,
        inputs: [
            { name: "to", type: "address" },
            { name: "approved", type: "bool" },
        ],
        name: "setApprovalForAll",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
        signature: "0xa22cb465",
    },
    {
        constant: false,
        inputs: [
            { name: "from", type: "address" },
            { name: "to", type: "address" },
            { name: "tokenId", type: "uint256" },
            { name: "_data", type: "bytes" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
        signature: "0xb88d4fde",
    },
    {
        constant: true,
        inputs: [{ name: "tokenId", type: "uint256" }],
        name: "tokenURI",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function",
        signature: "0xc87b56dd",
    },
    {
        constant: true,
        inputs: [],
        name: "baseTokenURI",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function",
        signature: "0xd547cfb7",
    },
    {
        constant: true,
        inputs: [
            { name: "owner", type: "address" },
            { name: "operator", type: "address" },
        ],
        name: "isApprovedForAll",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "view",
        type: "function",
        signature: "0xe985e9c5",
    },
    {
        inputs: [
            { name: "name", type: "string" },
            { name: "symbol", type: "string" },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
        signature: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "owner", type: "address" },
            { indexed: true, name: "tokenId", type: "uint256" },
        ],
        name: "Mint",
        type: "event",
        signature: "0x0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885",
    },
    {
        anonymous: false,
        inputs: [{ indexed: false, name: "account", type: "address" }],
        name: "Paused",
        type: "event",
        signature: "0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258",
    },
    {
        anonymous: false,
        inputs: [{ indexed: false, name: "account", type: "address" }],
        name: "Unpaused",
        type: "event",
        signature: "0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa",
    },
    {
        anonymous: false,
        inputs: [{ indexed: true, name: "account", type: "address" }],
        name: "PauserAdded",
        type: "event",
        signature: "0x6719d08c1888103bea251a4ed56406bd0c3e69723c8a1686e017e7bbe159b6f8",
    },
    {
        anonymous: false,
        inputs: [{ indexed: true, name: "account", type: "address" }],
        name: "PauserRemoved",
        type: "event",
        signature: "0xcd265ebaf09df2871cc7bd4133404a235ba12eff2041bb89d9c714a2621c7c7e",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "from", type: "address" },
            { indexed: true, name: "to", type: "address" },
            { indexed: true, name: "tokenId", type: "uint256" },
        ],
        name: "Transfer",
        type: "event",
        signature: "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "owner", type: "address" },
            { indexed: true, name: "approved", type: "address" },
            { indexed: true, name: "tokenId", type: "uint256" },
        ],
        name: "Approval",
        type: "event",
        signature: "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "owner", type: "address" },
            { indexed: true, name: "operator", type: "address" },
            { indexed: false, name: "approved", type: "bool" },
        ],
        name: "ApprovalForAll",
        type: "event",
        signature: "0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31",
    },
    {
        constant: false,
        inputs: [],
        name: "mint",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function",
        signature: "0x1249c58b",
    },
    {
        constant: false,
        inputs: [{ name: "_baseTokenURI", type: "string" }],
        name: "setBaseTokenURI",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
        signature: "0x30176e13",
    },
];