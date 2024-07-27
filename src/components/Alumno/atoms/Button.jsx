function Button({ children, ...props }) {
  return (
    <button
      className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors md:py-3 md:px-6"
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
