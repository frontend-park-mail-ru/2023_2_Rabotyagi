declare type Resource = {
    url: string,
}

declare function getResourceUrl(resource: Resource): Resource;
declare function getResourceUrl(resource: string): string;

// export function searchNode(node: Node, id: number);
// export function searchNode(node: Array<Node>, id: number);

// export class Node {
//     id: number;
//     name: string;
//     parentId: number | null;
//     childs: Array<Node> = [];

//     constructor({ id, name, parent_id: parentId }: {id: number, name: string, parent_id: number | null});
// }

// export class Validate {
//     static password(password: string): string | null;
//     static passwordEqual(password: string, passwordRepeat: string): string | null;
//     static email(email: string): string | null;
//     static phone(phone: string): string | null;
//     static username(name: string): string | null;
//     static allowedFormats(allowedFormats: string, files: Array<File>): string | null
// }
