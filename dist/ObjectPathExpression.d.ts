export declare type PathExpression<T, TLeaf> = (t: T) => TLeaf;
export interface ObjectPath<T> {
    path: PropertyKey[];
    child<TLeaf>(pathExpression: PathExpression<T, TLeaf>): ObjectPath<TLeaf>;
}
export declare function getPath<TRoot, TLeaf>(pathExpression: PathExpression<TRoot, TLeaf>): PropertyKey[];
export declare function getObjectPath<TRoot, TLeaf>(pathExpression: PathExpression<TRoot, TLeaf>): ObjectPath<TLeaf>;
export declare function getObjectPath<TRoot>(): ObjectPath<TRoot>;
