declare namespace FileUploadModuleScssNamespace {
  export interface IFileUploadModuleScss {
    files: string;
    input: string;
    item: string;
    root: string;
    size: string;
  }
}

declare const FileUploadModuleScssModule: FileUploadModuleScssNamespace.IFileUploadModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: FileUploadModuleScssNamespace.IFileUploadModuleScss;
};

export = FileUploadModuleScssModule;
