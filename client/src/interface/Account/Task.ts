interface ITask {
	user: () => Promise<any>;
	restaurant: () => Promise<any>;
	courier: () => Promise<any>;
}

export default ITask;
