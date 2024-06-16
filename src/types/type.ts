enum PtxFileCategory {
  Transaction = "transaction",
  Profile = "profile",
  Report = "report",
  Receipt = "receipt",
  Others = "others",
}

export type UploadParams = {
  userId: string;
  category: PtxFileCategory;
  fileName: string;
  extension: string;
};
