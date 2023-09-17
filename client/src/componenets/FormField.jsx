import React from 'react'

// 15 - In the form field we needs many props, which includes lableName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe
// 16 - htmlFor is a way to create a link between a label and an input element, enhancing the usability and accessibility of your web forms.
const FormField = ( {lableName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
          <label 
          htmlFor= {name}
          className = "block text-sm font-medium text-gray-900"
          >
            {lableName}
          </label>
          {isSurpriseMe && (
            <button 
            type = "button"
            onClick={handleSurpriseMe}
            className = "font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black"
            >
            Surprise me
            </button>
          )}
      </div>
      <input 
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      value = {value}
      onChange = {handleChange}
      required
      className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outlibe-none block w-full p-3" />

    </div>
  )
// 17 - When the surprise is inputed using formfield, it will create a button and call the handleSurpriseMe which outputs a random text which will be disaplyed
// 18 - For the input tag, we have defined multiple parameter which needs to be updated when formfield is created
}

export default FormField