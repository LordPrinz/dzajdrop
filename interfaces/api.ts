export type AnnonResponse = {
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

export type Success = {
	status: boolean;
	data: {
		file: File;
	};
};

export type ErrorType =
	| "ERROR_FILE_NOT_PROVIDED"
	| "ERROR_FILE_EMPTY"
	| "ERROR_FILE_INVALID"
	| "ERROR_USER_MAX_FILES_PER_HOUR_REACHED"
	| "ERROR_USER_MAX_FILES_PER_DAY_REACHED"
	| "ERROR_USER_MAX_BYTES_PER_HOUR_REACHED"
	| "ERROR_USER_MAX_BYTES_PER_DAY_REACHED"
	| "ERROR_FILE_DISALLOWED_TYPE"
	| "ERROR_FILE_SIZE_EXCEEDED"
	| "ERROR_FILE_BANNED"
	| "STATUS_ERROR_SYSTEM_FAILURE"
	| "FILE_NOT_FOUND";

export type ErrorCode =
	| 10
	| 11
	| 12
	| 20
	| 21
	| 22
	| 23
	| 30
	| 31
	| 32
	| 40
	| 404;

export type Error = {
	status: boolean;
	error: {
		message: string;
		type: ErrorType;
		code: ErrorCode;
	};
};
