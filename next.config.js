module.exports = {
	async rewrites() {
		return [
			{
				source: "/api/v1/uploadFile",
				destination: "https://api.anonfiles.com/upload",
			},
		];
	},
};
