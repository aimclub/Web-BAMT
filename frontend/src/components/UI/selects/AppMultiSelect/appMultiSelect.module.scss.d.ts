declare namespace AppMultiSelectModuleScssNamespace {
  export interface IAppMultiSelectModuleScss {
    disabled: string;
    helperText: string;
    input: string;
    item: string;
    itemIcon: string;
    label: string;
    select: string;
    values: string;
    valuesItem: string;
  }
}

declare const AppMultiSelectModuleScssModule: AppMultiSelectModuleScssNamespace.IAppMultiSelectModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AppMultiSelectModuleScssNamespace.IAppMultiSelectModuleScss;
};

export = AppMultiSelectModuleScssModule;
