declare type Resource = {
    url: string,
}

declare function getResourceUrl(resource: Resource): Resource;
declare function getResourceUrl(resource: string): string;
