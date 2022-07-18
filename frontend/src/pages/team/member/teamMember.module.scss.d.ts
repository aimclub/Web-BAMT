declare namespace TeamMemberModuleScssNamespace {
  export interface ITeamMemberModuleScss {
    link: string;
    role: string;
    root: string;
    title: string;
  }
}

declare const TeamMemberModuleScssModule: TeamMemberModuleScssNamespace.ITeamMemberModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TeamMemberModuleScssNamespace.ITeamMemberModuleScss;
};

export = TeamMemberModuleScssModule;
