
    export type RemoteKeys = 'dynamicRemote/routes';
    type PackageType<T> = T extends 'dynamicRemote/routes' ? typeof import('dynamicRemote/routes') :any;