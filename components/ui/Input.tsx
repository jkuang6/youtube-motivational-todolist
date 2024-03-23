interface inputProps{
  name: string;
  type: string;
  placeholder?: string;
  value?: string;
}

const Input = ({ name, type, placeholder, value}: inputProps) => {
  return (
    <div>
      <input 
        className="w-96 p-2 border border-gray-200"
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}        
        >
      </input>
    </div>
  )
}

export default Input