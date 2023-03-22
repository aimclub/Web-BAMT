export const DATA_BASE_DATASETS = ["vk", "hack"];

export type IDataSets = Record<string, string>;

export interface IUploadDataset {
  name: string;
  owner: string;
  description: string;
  file: File;
}
