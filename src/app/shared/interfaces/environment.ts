export enum EnvType {
  STG = 'stg',
  PROD = 'prod',
  LOCAL = 'local',
}

export interface Environment {
  api: string;
  envType: EnvType;
}
