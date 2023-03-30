module.exports = {
	async rewrites() {
		return [
			{
				source: "/api/upload",
				destination: "https://api.anonfiles.com/upload",
			},
		];
	},
};
