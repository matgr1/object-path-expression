declare const process: IApplicationProcess;

export type PathExpression<T, TLeaf> = (t: T) => TLeaf;

export interface ObjectPath<T>
{
	path: PropertyKey[];
	child<TLeaf>(pathExpression: PathExpression<T, TLeaf>): ObjectPath<TLeaf>;
}

export function getPath<TRoot, TLeaf>(pathExpression: PathExpression<TRoot, TLeaf>): PropertyKey[]
{
	let leaf = getObjectPath<TRoot, TLeaf>(pathExpression);
	return leaf.path;
}

export function getObjectPath<TRoot, TLeaf>(pathExpression: PathExpression<TRoot, TLeaf>): ObjectPath<TLeaf>;
export function getObjectPath<TRoot>(): ObjectPath<TRoot>;
export function getObjectPath<TRoot>(pathExpression?: PathExpression<TRoot, any>): ObjectPath<any>
{
	let path = createObjectPath<TRoot>([]);

	if (typeof (pathExpression) === "function")
	{
		path = path.child(pathExpression);
	}

	return path;
}

function createObjectPath<T>(path: PropertyKey[]): ObjectPath<T>
{
	let _path = path;

	function _child<TLeaf>(pathExpression: PathExpression<T, TLeaf>): ObjectPath<TLeaf>
	{
		let proxy = createObjectPathProxy<T>([]);
		pathExpression(proxy.proxy);

		let childPath = _path.concat(proxy.path);
		return createObjectPath(childPath);
	}

	return {
		path: _path,
		child: _child
	};
}

interface ObjectPathProxy<T>
{
	proxy: T;
	path: PropertyKey[];
}

const _proxyTarget = Object.freeze({});

function createObjectPathProxy<T>(path: PropertyKey[]): ObjectPathProxy<T>
{
	let result: ObjectPathProxy<T> = {
		proxy: null,
		path: path
	};

	let _proxyAccessed = false;

	result.proxy = new Proxy<any>(
		_proxyTarget,
		{
			get(target, propertyKey, receiver)
			{
				if (process.env.NODE_ENV !== "production")	
				{
					if (_proxyAccessed)
					{
						throw new Error("Parent already accessed");
					}

					_proxyAccessed = true;
					result.path.push(propertyKey);

					let childProxy = createObjectPathProxy(result.path);
					return childProxy.proxy;
				}

				_proxyAccessed = true;
				result.path.push(propertyKey);

				return result.proxy;
			}
		});

	return result;
}
