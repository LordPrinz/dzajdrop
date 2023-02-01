export type File = {
	url: {
		full: string;
		short: string;
	};
	metadata: {
		id: string;
		name: string;
		size: {
			bytes: number;
			readable: string;
		};
	};
};

export type SuccessStatus = {
	status: boolean;
	data: {
		file: File;
	};
};
