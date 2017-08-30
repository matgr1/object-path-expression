declare interface IApplicationProcessEnvironment
{
	NODE_ENV: "development" | "production";
}

declare interface IApplicationProcess
{
	env: IApplicationProcessEnvironment;
}