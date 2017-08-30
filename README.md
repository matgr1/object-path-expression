# object-path-expressions

Adds type safety to functions that accept deep path arrays

For example, given: 

``` typescript
function pathArraysFunction(object: any, path: PropertyKey[]): any
{
	let result: any = object;

	for (let i = 0; i < path.length; i++)
	{
		result = result[path[i]];
	}

	return result;
}

interface ExampleNestedInterface
{
	nestedProperty1: string;
	nestedProperty2: number;
}

interface ExampleInterface
{
	property1: ExampleNestedInterface;
}

let exampleObject: ExampleInterface = {
	property1: {
		nestedProperty1: "example",
		nestedProperty2: 1234
	}
};
```

instead of this:

``` typescript
let valueWithAnyType = pathArraysFunction(exampleObject, ["property1", "nestedProperty1"]);
pathArraysFunction(exampleObject, ["invalidProperty1", "nestedProperty1"]); // ouch! runtime error
```

we can do this:

``` typescript
import { getObjectPath, PathExpression } from "object-path-expression";

function pathArraysFunctionWrapper<T, TLeaf>(object: T, pathExpression: PathExpression<T, TLeaf>): TLeaf
{
	let path = getObjectPath(pathExpression);
	return pathArraysFunction(object, path.path);
}

let valueWithTypeOfNestedProperty1 = pathArraysFunctionWrapper(exampleObject, o => o.property1.nestedProperty1);
pathArraysFunctionWrapper(exampleObject, o => o.invalidProperty1.nestedProperty1); // compile time error
```