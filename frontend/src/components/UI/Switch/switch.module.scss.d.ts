declare namespace SwitchModuleScssNamespace {
  export interface ISwitchModuleScss {
    checked: string;
    disabled: string;
    input: string;
    label: string;
    root: string;
    thumb: string;
    track: string;
  }
}

declare const SwitchModuleScssModule: SwitchModuleScssNamespace.ISwitchModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SwitchModuleScssNamespace.ISwitchModuleScss;
};

export = SwitchModuleScssModule;
