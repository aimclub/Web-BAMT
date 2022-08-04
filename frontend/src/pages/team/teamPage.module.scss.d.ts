declare namespace TeamPageModuleScssNamespace {
  export interface ITeamPageModuleScss {
    description: string;
    item: string;
    list: string;
    root: string;
    subtitle: string;
  }
}

declare const TeamPageModuleScssModule: TeamPageModuleScssNamespace.ITeamPageModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TeamPageModuleScssNamespace.ITeamPageModuleScss;
};

export = TeamPageModuleScssModule;
