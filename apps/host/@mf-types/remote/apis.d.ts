
    export type RemoteKeys = 'remote/routes';
    type PackageType<T> = T extends 'remote/routes' ? typeof import('remote/routes') :any;