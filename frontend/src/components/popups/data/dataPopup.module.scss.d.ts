declare namespace DataPopupModuleScssNamespace {
  export interface IDataPopupModuleScss {
    active: string;
    content: string;
    list: string;
    tag: string;
    tags: string;
    visible: string;
  }
}

declare const DataPopupModuleScssModule: DataPopupModuleScssNamespace.IDataPopupModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DataPopupModuleScssNamespace.IDataPopupModuleScss;
};

export = DataPopupModuleScssModule;
