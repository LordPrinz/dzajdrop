export default ({ progress }) => {
	return (
		<li className="file">
			<div
				className={`absolute top-0 -left-full w-full h-full bg-main-lighterGrey -z-10 transition translate-x-[${progress}%]`}
			></div>
			<div className="flex justify-between items-center">
				<div>
					<div className="text-sm mb-1 font-bold">Uploading...</div>
					<div className="text-xs font-normal text-main-grey">
						{progress}% &#183; 10 seconds left
					</div>
				</div>
				<div>PAUSE</div>
			</div>
			<div></div>
		</li>
	);
};
