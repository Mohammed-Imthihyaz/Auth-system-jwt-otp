const Input = ({ icon: Icon, ...props }) => {
	return (
		<div>
            
            <div className="mt-2 flex items-center ">
				<Icon className="text-black " /> {/* Add margin-right to the icon */}
                <input
                  {...props}
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
        </div>
	);
};

export default Input;
