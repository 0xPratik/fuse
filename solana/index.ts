import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
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
