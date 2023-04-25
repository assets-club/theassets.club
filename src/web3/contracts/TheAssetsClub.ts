import { utils } from 'ethers';
import { Address, mainnet, sepolia } from 'wagmi';
import chainMap from '../utils/chainMap';

// Types
export enum Phase {
  PRIVATE_SALE,
  PUBLIC_SALE,
  CLOSED,
}

export enum Proof {
  CLAIM,
  MINT,
}

export enum Tier {
  PUBLIC,
  ACCESS_LIST,
  OG,
}

// Constants
// The maximum Assets mints, which effectively caps the total supply.
export const MAXIMUM_MINTS = 5777;

// Royalties 7.7% on secondary sales.
export const ROYALTIES = 770;

// The maximum token mints per account.
export const MAXIMUM_MINTS_PER_ACCOUNT = 7;
// The price per token for paid mints.
export const SALE_PRICE = utils.parseEther('0.02');

// The private sale duration in seconds.
export const PRIVATE_SALE_DURATION = chainMap<number>({
  [mainnet.id]: 24 * 3600, // 1 day in seconds
  [sepolia.id]: 30 * 24 * 3600, // 30 day in seconds
});

// The public sale duration in seconds.
export const PUBLIC_SALE_DURATION = chainMap<number>({
  [mainnet.id]: 2 * 24 * 3600, // 2 days in seconds
  [sepolia.id]: 30 * 24 * 3600, // 30 day in seconds
});

export const START_DATE = chainMap<number>({
  [mainnet.id]: 1682586000, // Thu Apr 27 2023 09:00:00 GMT
  [sepolia.id]: 1680339600,
});

// Thu Apr 28 2023 09:00:00 GMT
export const PRIVATE_SALE_END_DATE = START_DATE + PRIVATE_SALE_DURATION;
// Thu Apr 30 2023 09:00:00 GMT
export const PUBLIC_SALE_END_DATE = PRIVATE_SALE_END_DATE + PUBLIC_SALE_DURATION;

export const NFT_PARIS = chainMap<Address>({
  [mainnet.id]: '0xd13fbe29dbd15bd0175122a4f8c90072c568511d',
  [sepolia.id]: '0x7ddE30D4d8bD23481E6f92B15A365797891413ed',
});

const TheAssetsClub = {
  address: chainMap<Address>({
    [mainnet.id]: '0x81F2E73c790BFB10912151ab5A7B411Ed391D0F7',
    [sepolia.id]: '0x5f47c6c69a4c371082388b2c68d96dbc6088b758',
  }),

  abi: [
    {
      inputs: [
        {
          internalType: 'address',
          name: 'admin',
          type: 'address',
        },
        {
          internalType: 'contract IERC721A',
          name: '_tacp',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_coordinator',
          type: 'address',
        },
        {
          internalType: 'bytes32',
          name: '_keyHash',
          type: 'bytes32',
        },
        {
          internalType: 'uint64',
          name: '_subId',
          type: 'uint64',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'quantity',
          type: 'uint256',
        },
      ],
      name: 'AlreadyClaimed',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ApprovalCallerNotOwnerNorApproved',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ApprovalQueryForNonexistentToken',
      type: 'error',
    },
    {
      inputs: [],
      name: 'BalanceQueryForZeroAddress',
      type: 'error',
    },
    {
      inputs: [],
      name: 'Closed',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'remaining',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'actual',
          type: 'uint256',
        },
      ],
      name: 'InsufficientSupply',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'acccount',
          type: 'address',
        },
        {
          internalType: 'enum Tier',
          name: 'tier',
          type: 'uint8',
        },
      ],
      name: 'InsufficientTier',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'quantity',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'expected',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'actual',
          type: 'uint256',
        },
      ],
      name: 'InsufficientValue',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'acccount',
          type: 'address',
        },
      ],
      name: 'InvalidMerkleProof',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'enum Tier',
          name: 'tier',
          type: 'uint8',
        },
        {
          internalType: 'uint256',
          name: 'quantity',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'skip',
          type: 'uint256',
        },
      ],
      name: 'InvalidPricing',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'expected',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'actual',
          type: 'uint256',
        },
      ],
      name: 'InvalidVRFRequestId',
      type: 'error',
    },
    {
      inputs: [],
      name: 'MintERC2309QuantityExceedsLimit',
      type: 'error',
    },
    {
      inputs: [],
      name: 'MintToZeroAddress',
      type: 'error',
    },
    {
      inputs: [],
      name: 'MintZeroQuantity',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'NFTParisAlreadyUsed',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'NFTParisNotHolder',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NewOwnerIsZeroAddress',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NoHandoverRequest',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'have',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'want',
          type: 'address',
        },
      ],
      name: 'OnlyCoordinatorCanFulfill',
      type: 'error',
    },
    {
      inputs: [],
      name: 'OnlyUnrevealed',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
      ],
      name: 'OperatorNotAllowed',
      type: 'error',
    },
    {
      inputs: [],
      name: 'OwnerQueryForNonexistentToken',
      type: 'error',
    },
    {
      inputs: [],
      name: 'OwnershipNotInitializedForExtraData',
      type: 'error',
    },
    {
      inputs: [],
      name: 'TransferCallerNotOwnerNorApproved',
      type: 'error',
    },
    {
      inputs: [],
      name: 'TransferFromIncorrectOwner',
      type: 'error',
    },
    {
      inputs: [],
      name: 'TransferToNonERC721ReceiverImplementer',
      type: 'error',
    },
    {
      inputs: [],
      name: 'TransferToZeroAddress',
      type: 'error',
    },
    {
      inputs: [],
      name: 'URIQueryForNonexistentToken',
      type: 'error',
    },
    {
      inputs: [],
      name: 'Unauthorized',
      type: 'error',
    },
    {
      inputs: [],
      name: 'WithdrawFailed',
      type: 'error',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'approved',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'Approval',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'bool',
          name: 'approved',
          type: 'bool',
        },
      ],
      name: 'ApprovalForAll',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'fromTokenId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'toTokenId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
      ],
      name: 'ConsecutiveTransfer',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'pendingOwner',
          type: 'address',
        },
      ],
      name: 'OwnershipHandoverCanceled',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'pendingOwner',
          type: 'address',
        },
      ],
      name: 'OwnershipHandoverRequested',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'oldOwner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'OwnershipTransferred',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event',
    },
    {
      inputs: [],
      name: 'OPERATOR_FILTER_REGISTRY',
      outputs: [
        {
          internalType: 'contract IOperatorFilterRegistry',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'approve',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
      ],
      name: 'balanceOf',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'burn',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'input',
          type: 'bytes32',
        },
      ],
      name: 'bytes32toAddress',
      outputs: [
        {
          internalType: 'address',
          name: 'addr',
          type: 'address',
        },
      ],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [],
      name: 'cancelOwnershipHandover',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'quantity',
          type: 'uint256',
        },
        {
          internalType: 'bytes32[]',
          name: 'proof',
          type: 'bytes32[]',
        },
      ],
      name: 'claimTo',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'claimed',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'pendingOwner',
          type: 'address',
        },
      ],
      name: 'completeOwnershipHandover',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'contractURI',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'coordinator',
      outputs: [
        {
          internalType: 'contract VRFCoordinatorV2Interface',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'getApproved',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'enum Tier',
          name: 'tier',
          type: 'uint8',
        },
        {
          internalType: 'uint256',
          name: 'quantity',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'skip',
          type: 'uint256',
        },
      ],
      name: 'getPrice',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
      ],
      name: 'isApprovedForAll',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'merkelRoot',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'quantity',
          type: 'uint256',
        },
        {
          internalType: 'enum Tier',
          name: 'tier',
          type: 'uint8',
        },
        {
          internalType: 'bytes32[]',
          name: 'proof',
          type: 'bytes32[]',
        },
      ],
      name: 'mintTo',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'minted',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'name',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'nextTokenId',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'nftParis',
      outputs: [
        {
          internalType: 'contract IERC721A',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'nftParisUsed',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: 'result',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'ownerOf',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'pendingOwner',
          type: 'address',
        },
      ],
      name: 'ownershipHandoverExpiresAt',
      outputs: [
        {
          internalType: 'uint256',
          name: 'result',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'ownershipHandoverValidFor',
      outputs: [
        {
          internalType: 'uint64',
          name: '',
          type: 'uint64',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'phase',
      outputs: [
        {
          internalType: 'enum Phase',
          name: '',
          type: 'uint8',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'requestId',
          type: 'uint256',
        },
        {
          internalType: 'uint256[]',
          name: 'randomWords',
          type: 'uint256[]',
        },
      ],
      name: 'rawFulfillRandomWords',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'remaining',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'requestOwnershipHandover',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'reserved',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'reveal',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_tokenId',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_salePrice',
          type: 'uint256',
        },
      ],
      name: 'royaltyInfo',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: '_data',
          type: 'bytes',
        },
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'seed',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          internalType: 'bool',
          name: 'approved',
          type: 'bool',
        },
      ],
      name: 'setApprovalForAll',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'newBaseURI',
          type: 'string',
        },
      ],
      name: 'setBaseURI',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'newContractURI',
          type: 'string',
        },
      ],
      name: 'setContractURI',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: '_merkelRoot',
          type: 'bytes32',
        },
        {
          internalType: 'uint256',
          name: '_reserved',
          type: 'uint256',
        },
      ],
      name: 'setMintParameters',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes4',
          name: 'interfaceId',
          type: 'bytes4',
        },
      ],
      name: 'supportsInterface',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'symbol',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'tokenURI',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'totalSupply',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'transferFrom',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'withdraw',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ] as const,
};

export default TheAssetsClub;
