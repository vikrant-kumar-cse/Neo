export function PrimaryButton({ children, onClick }) {
    return (
      <button
        onClick={onClick}
        className="w-full h-12 px-4 py-2 bg-indigo-500 text-white text-sm font-semibold font-['Poppins'] rounded hover:bg-indigo-600 transition"
      >
        {children}
      </button>
    );
  }
  
  export function SecondaryButton({ children, onClick }) {
    return (
      <button
        onClick={onClick}
        className="w-full h-12 px-4 py-2 border border-indigo-500 text-indigo-500 text-sm font-semibold font-['Poppins'] rounded hover:bg-indigo-500 hover:text-white transition"
      >
        {children}
      </button>
    );
  }
  
  export function InputField({ label, type = 'text', placeholder, value, onChange, error, className, trailingIcon }) {
    return (
      <div className="w-full flex flex-col relative">
        <label className="absolute left-4 top-0 transform -translate-y-1/2 bg-white px-1 text-zinc-900 text-sm font-normal font-['Poppins'] z-10">
          {label}
        </label>
        <div className="relative w-full">
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`w-full h-14 px-4 py-2 border border-zinc-500 rounded outline-none focus:border-indigo-500 text-zinc-900 text-base font-normal font-['Poppins'] ${error ? 'border-rose-400' : ''} ${className || ''}`}
          />
          {trailingIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center">
              <div className="w-4 h-4 bg-zinc-800 rounded-full"></div>
            </div>
          )}
        </div>
        {error && <p className="text-rose-400 text-sm mt-1">{error}</p>}
      </div>
    );
  }
  
  export function Checkbox({ label, checked, onChange }) {
    return (
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="hidden"
        />
        <div
          onClick={onChange}
          className={`w-6 h-6 border-2 rounded flex items-center justify-center ${
            checked ? 'bg-rose-400 border-rose-400' : 'border-zinc-800'
          }`}
        >
          {checked && (
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <span className="text-zinc-800 text-sm font-medium font-['Poppins']">{label}</span>
      </label>
    );
  }
  