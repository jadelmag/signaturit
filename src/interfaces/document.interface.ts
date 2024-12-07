export interface Document {
  id: string;
  name: string;
  status: "Pending" | "Signed" | "Declined";
  signers: string[];
}

export interface NewDocument {
  id: string;
  name: string;
  status: "Pending";
  signers: string[];
}
