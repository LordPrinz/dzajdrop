export default () => {
	return (
		<li className="file file--error">
			<div className="flex justify-between items-center relative overflow-hidden pb-3">
				<div>
					<div
						className="text-sm mb-1 font-bold"
						style={{
							transitionDuration: "0.3s",
							transitionDelay: "0.4s",
						}}
					>
						Error
					</div>
					<div className="text-xs font-normal text-main-grey">
						&#183; 4 seconds left
					</div>
				</div>
			</div>
		</li>
	);
};
