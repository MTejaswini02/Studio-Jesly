function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
}) {

  const styles = {
    primary:
      "bg-yellow-500 hover:bg-yellow-400 text-black",

    edit:
      "bg-blue-600 hover:bg-blue-700 text-white",

    delete:
      "bg-red-600 hover:bg-red-700 text-white",

    secondary:
      "bg-zinc-700 hover:bg-zinc-600 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-semibold transition ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;