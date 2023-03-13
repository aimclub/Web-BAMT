declare namespace UploadFormModuleScssNamespace {
  export interface IUploadFormModuleScss {
    column: string;
    data: string;
    description: string;
    form: string;
    format: string;
    item: string;
    label: string;
    root: string;
    subtitle: string;
    textfield: string;
    title: string;
    upload: string;
  }
}

declare const UploadFormModuleScssModule: UploadFormModuleScssNamespace.IUploadFormModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: UploadFormModuleScssNamespace.IUploadFormModuleScss;
};

export = UploadFormModuleScssModule;
