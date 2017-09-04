# object-path-expressions

Adds type safety to functions that accept deep path arrays.

The function "getObjectPath" accepts a path expression that can be used to select a deeply nested property and return a corresponding path array. The object passed to the path expression is a Proxy that ensures that nested properties can be accessed without throwing ReferenceErrors.  However, properties should ONLY be accessed ONCE (this will be enforced when NODE_ENV is not "production").

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

Instead of this:

``` typescript
let valueWithAnyType = pathArraysFunction(exampleObject, ["property1", "nestedProperty1"]);
pathArraysFunction(exampleObject, ["invalidProperty1", "nestedProperty1"]); // ouch! runtime error
```

We can do this:

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
