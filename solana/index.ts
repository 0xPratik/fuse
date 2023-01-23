import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  createInitializeMintInstruction,
  createMintToInstruction,
  getAssociatedTokenAddress,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { Fusionminter, IDL } from "./fusionminter";

const opts = {
  preflightCommitment: "processed" as anchor.web3.ConfirmOptions,
};

const programId = new anchor.web3.PublicKey(
  "GtpAku8MsJBjVu4kKFnaPxXAVJFoVK7zq8CT6v6LGUwm"
);
export const getConnection = (): anchor.web3.Connection => {
  const connectionURI = `https://rpc.helius.xyz/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API}`;
  const connection = new anchor.web3.Connection(connectionURI);

  return connection;
};

export const getProvider = (wallet: anchor.Wallet): anchor.AnchorProvider => {
  const connection = getConnection();

  const provider = new anchor.AnchorProvider(
    connection,
    wallet,
    opts.preflightCommitment
  );

  return provider;
};

export const getProgram = (wallet: anchor.Wallet) => {
  const idl = IDL as anchor.Idl;
  const provider = getProvider(wallet);

  const program = new anchor.Program(
    idl,
    programId,
    provider
  ) as unknown as Program<Fusionminter>;

  return program;
};


const TRIFLE_PROGRAM_ADDRESS = "trifMWutwBxkSuatmpPVnEe7NoE3BJKgjVi8sSyoXWX";
const TM_ID = new anchor.web3.PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);
const constraint_model = new anchor.web3.PublicKey(
  "5WuRQnJSze2fKaU5C1tmbjdJdz8b1AimshJwUfRGrd7i"
);

export const findTriflePda = async (
  mint: anchor.web3.PublicKey,
  authority: anchor.web3.PublicKey
) => {
  return await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from("trifle"), mint.toBuffer(), authority.toBuffer()],
    new anchor.web3.PublicKey(TRIFLE_PROGRAM_ADDRESS)
  );
};

export const findEscrowPda = async (
  mint: PublicKey,
  authority: 0 | 1,
  creator?: PublicKey
) => {
  let seeds = [
    Buffer.from("metadata"),
    TM_ID.toBuffer(),
    mint.toBuffer(),
    Uint8Array.from([authority]),
  ];

  if (authority == 1) {
    if (creator) {
      seeds.push(creator.toBuffer());
    } else {
      throw new Error("Creator is required");
    }
  }

  seeds.push(Buffer.from("escrow"));
  return await anchor.web3.PublicKey.findProgramAddress(seeds, TM_ID);
};

export const mintParent = async (wallet: anchor.Wallet) => {
  const program = getProgram(wallet);

  let [config_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("parent")],
    program.programId
  );
  const mint = new anchor.web3.Keypair();

  const [metadatakey] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from("metadata"), TM_ID.toBuffer(), mint.publicKey.toBuffer()],
    TM_ID
  );

  const [masterKey] = await anchor.web3.PublicKey.findProgramAddress(
    [
      Buffer.from("metadata"),
      TM_ID.toBuffer(),
      mint.publicKey.toBuffer(),
      Buffer.from("edition"),
    ],
    TM_ID
  );

  const transaction = new anchor.web3.Transaction();
  const { blockhash } = await program.provider.connection.getLatestBlockhash(
    "finalized"
  );
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = wallet.publicKey;

  let [trifleAddress] = await findTriflePda(mint.publicKey, config_account);
  let [escrowAddress] = await findEscrowPda(mint.publicKey, 1, trifleAddress);

  const additionalComputeBudgetInstruction =
    anchor.web3.ComputeBudgetProgram.requestUnits({
      units: 250000,
      additionalFee: 0,
    });

  transaction.add(additionalComputeBudgetInstruction);

  const lamports =
    await program.provider.connection.getMinimumBalanceForRentExemption(
      MINT_SIZE
    );

  transaction.add(
    anchor.web3.SystemProgram.createAccount({
      fromPubkey: wallet.publicKey, // The account that will transfer lamports to the created account
      newAccountPubkey: mint.publicKey, // Public key of the created account
      space: MINT_SIZE, // Amount of space in bytes to allocate to the created account
      lamports, // Amount of lamports to transfer to the created account
      programId: TOKEN_PROGRAM_ID, // Public key of the program to assign as the owner of the created account
    }),
    createInitializeMintInstruction(
      mint.publicKey, // mint pubkey
      0, // decimals
      wallet.publicKey, // mint authority
      wallet.publicKey // freeze authority (you can use `null` to disable it. when you disable it, you can't turn it on again)
    )
  );
  // ata stands for Associated Token Account
  let wallet_ata = await getAssociatedTokenAddress(
    mint.publicKey, // mint
    wallet.publicKey // owner
  );

  transaction.add(
    createAssociatedTokenAccountInstruction(
      wallet.publicKey,
      wallet_ata,
      wallet.publicKey,
      mint.publicKey
    ),
    createMintToInstruction(
      mint.publicKey, // mint
      wallet_ata,
      wallet.publicKey,
      1
    )
  );

  const ix = await program.methods
    .mintParent()
    .accounts({
      authority: wallet.publicKey,
      mint: mint.publicKey,
      authorityTokenAccount: wallet_ata,
      configAccount: config_account,
      masterEdition: masterKey,
      metadata: metadatakey,
      // MISC
      mplProgram: TM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: anchor.web3.SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      trifleAccount: trifleAddress,
      trifleProgram: TRIFLE_PROGRAM_ADDRESS,
      sysvar: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
      escrowConstraintModel: constraint_model,
      escrowAccount: escrowAddress,
    })
    .instruction();

  transaction.add(ix);
  transaction.partialSign(mint);

  const signed_transaction = await wallet.signTransaction(transaction);
  const serialized_transaction = signed_transaction.serialize();

  const sig = await program.provider.connection.sendRawTransaction(
    serialized_transaction,
    {
      skipPreflight: true,
    }
  );
  await program.provider.connection.confirmTransaction(sig, "confirmed");

  console.log("Parent NFT", sig);

  return {
    mint: mint.publicKey,
    sig: sig
  }
};

export const transferIn = async(wallet: anchor.Wallet,parentMint: anchor.web3.PublicKey,uri:string) => {
    const program = getProgram(wallet);

    let escrowATA = await getAssociatedTokenAddress(
        parentMint, // mint
        wallet.publicKey // owner
      );
      let [config_account] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("parent")],
        program.programId
      );

      let [trifleAddress] = await findTriflePda(parentMint, config_account);

      console.log("trifleAddress",trifleAddress);

      let [escrowAddress] = await findEscrowPda(parentMint, 1, trifleAddress);


    const attribute_mint = new anchor.web3.Keypair();

    const [attmetadatakey] = await anchor.web3.PublicKey.findProgramAddress(
        [
          Buffer.from("metadata"),
          TM_ID.toBuffer(),
          attribute_mint.publicKey.toBuffer(),
        ],
        TM_ID
      );
    
      const [attmasterKey] = await anchor.web3.PublicKey.findProgramAddress(
        [
          Buffer.from("metadata"),
          TM_ID.toBuffer(),
          attribute_mint.publicKey.toBuffer(),
          Buffer.from("edition"),
        ],
        TM_ID
      );
  
      let attata = await getAssociatedTokenAddress(
        attribute_mint.publicKey, // mint
        wallet.publicKey // owner
      );

      let babydst = await getAssociatedTokenAddress(
        attribute_mint.publicKey,
        escrowAddress,
        true
      )

      const [parentMaster] = await anchor.web3.PublicKey.findProgramAddress(
        [
          Buffer.from("metadata"),
          TM_ID.toBuffer(),
          parentMint.toBuffer(),
          Buffer.from("edition"),
        ],
        TM_ID
      );
        console.log("WALLET",wallet.publicKey.toString())
      console.log("ATT MINT",attribute_mint.publicKey.toString());
      console.log("SRC ATA",attata.toString());
      console.log("DST",babydst.toString());


      const transaction = new anchor.web3.Transaction();
      const { blockhash } = await program.provider.connection.getLatestBlockhash(
        "finalized"
      );
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = wallet.publicKey;

      const ix = await program.methods.transferInAttribute(
        "sand",
        new anchor.BN(1),
        uri
      ).accounts({
          associatedTokenProgram:ASSOCIATED_TOKEN_PROGRAM_ID,
          authority: wallet.publicKey,
          mplProgram:TM_ID,
          rent:anchor.web3.SYSVAR_RENT_PUBKEY,
          systemProgram:anchor.web3.SystemProgram.programId,
          tokenProgram:TOKEN_PROGRAM_ID,
          trifleProgram:TRIFLE_PROGRAM_ADDRESS,
          trifleAccount:trifleAddress,
          // escrowMint:mint.publicKey,
          escrowMint:parentMint,
          escrowAccount:escrowAddress,
          attributeMint:attribute_mint.publicKey,
          configAccount:config_account,
          // escrowEdition: masterKey,
          escrowEdition: parentMaster,
          escrowConstraintModel: constraint_model,
          // escrowTokenAccount:ata,
          escrowTokenAccount:escrowATA,
          attributeMetadata:attmetadatakey,
          attributeEdition:attmasterKey,
          attributeSrcTokenAccount:attata,
          attributeDstTokenAccount:babydst
      }).instruction()

      const additionalComputeBudgetInstruction =
      anchor.web3.ComputeBudgetProgram.requestUnits({
        units: 550000,
        additionalFee: 50000,
      });

      
      transaction.add(additionalComputeBudgetInstruction);
      transaction.add(ix)
      transaction.partialSign(attribute_mint);

      const signed_transaction = await wallet.signTransaction(transaction);
    const serialized_transaction = signed_transaction.serialize();

    const sig = await program.provider.connection.sendRawTransaction(
      serialized_transaction,
      {
        skipPreflight: true,
      }
    );
    await program.provider.connection.confirmTransaction(sig, "confirmed");


    console.log("This is Tranfer",sig);

    return sig;
}
