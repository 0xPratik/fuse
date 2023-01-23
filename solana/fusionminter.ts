export type Fusionminter = {
    "version": "0.1.0",
    "name": "fusionminter",
    "instructions": [
      {
        "name": "createConfig",
        "accounts": [
          {
            "name": "authority",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "configAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "uri",
            "type": "string"
          }
        ]
      },
      {
        "name": "mintParent",
        "accounts": [
          {
            "name": "authority",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "configAccount",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "mint",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "authorityTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "metadata",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "masterEdition",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "escrowAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "trifleAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "escrowConstraintModel",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "trifleProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "associatedTokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "mplProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "sysvar",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "transferInAttribute",
        "accounts": [
          {
            "name": "authority",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "configAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "trifleProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "escrowConstraintModel",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "trifleAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "escrowAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "escrowMint",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "escrowTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "escrowEdition",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "attributeMint",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "attributeSrcTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "attributeDstTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "attributeMetadata",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "attributeEdition",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "associatedTokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "mplProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "slot",
            "type": "string"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "uri",
            "type": "string"
          }
        ]
      }
    ],
    "accounts": [
      {
        "name": "parentNftConfig",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "authority",
              "type": "publicKey"
            },
            {
              "name": "metadataUri",
              "type": "string"
            },
            {
              "name": "bump",
              "type": "u8"
            }
          ]
        }
      }
    ]
  };
  
  export const IDL: Fusionminter = {
    "version": "0.1.0",
    "name": "fusionminter",
    "instructions": [
      {
        "name": "createConfig",
        "accounts": [
          {
            "name": "authority",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "configAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "uri",
            "type": "string"
          }
        ]
      },
      {
        "name": "mintParent",
        "accounts": [
          {
            "name": "authority",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "configAccount",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "mint",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "authorityTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "metadata",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "masterEdition",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "escrowAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "trifleAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "escrowConstraintModel",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "trifleProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "associatedTokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "mplProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "sysvar",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "transferInAttribute",
        "accounts": [
          {
            "name": "authority",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "configAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "trifleProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "escrowConstraintModel",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "trifleAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "escrowAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "escrowMint",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "escrowTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "escrowEdition",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "attributeMint",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "attributeSrcTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "attributeDstTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "attributeMetadata",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "attributeEdition",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "associatedTokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "mplProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "slot",
            "type": "string"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "uri",
            "type": "string"
          }
        ]
      }
    ],
    "accounts": [
      {
        "name": "parentNftConfig",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "authority",
              "type": "publicKey"
            },
            {
              "name": "metadataUri",
              "type": "string"
            },
            {
              "name": "bump",
              "type": "u8"
            }
          ]
        }
      }
    ]
  };
  