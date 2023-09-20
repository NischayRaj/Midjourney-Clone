import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { getRandomPrompt} from '../utils';
import { FormField, Loader } from '../componenets';


const CreatePost = () => {
// 11 - the useNavigate function is a hook provided by React Router to programmatically navigate to different routes or pages within your application.
const navigate = useNavigate();
// 12 - We create a form state which holds name prompt and photo
const [form, setForm] = useState({
  name: '',
  prompt:'',
  photo:'',
});

const [generatingImg, setGeneratingImg] = useState(false);
const [loading, setLoading] = useState(false);


const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value});
}

const handleSurpriseMe = () => {
const randomPrompt = getRandomPrompt(form.prompt);
setForm({ ...form, prompt: randomPrompt})
}

const generateImage = async () =>{
  if(form.prompt) {
    try{
      setGeneratingImg(true);
      const response = await fetch('http://localhost:8080/api/v1/dalle',
      {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({ prompt: form.prompt }),
      })
    
    const data = await response.json();

    setForm({ ...form, photo:`data:image/jpeg;base64,${data.photo}`})
    }
    catch(error){
      alert(error);
    } finally {
      setGeneratingImg(false);
    }
  }
  else {
    alert('Please enter a prompt')
  }
}

const handleSubmit = async (e) => {
  e.preventDefault();

  if(form.prompt && form.photo) {
    setLoading(true);
    try{
      const response = await fetch ('http://localhost:8080/api/v1/post',
      {
        method : 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({ ...form})
    });
    await response.json();
    alert('Success');
    navigate("/");
  }catch(err) {
    alert(err)
  }finally{
    setLoading(false);
  }
}
else {
  alert('Please enter a prompt')
}
}



  return (
// 13 - We created a section
// Which holds create heading, a paragraph
// 14 - Create a form tag which on click calls the handleSumbit which needs to be connected to backend

    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          Create
        </h1>
        <p classname="mt-2 text-[#666e75] text-[16px] max-w[500px]">
          Create imaginative and visually stunning images through Mid-Journey AI and share them with the community
        </p>
        </div>
        <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
        {/* 19 - We create a formfield for the first input field and assign the neccessary inputs to the parameters*/}
        <FormField 
        lableName = "Your Name"
        type = "text"
        name = "name"
        placeholder = "John Doe"
        value = {form.name} 
        handleChange = {handleChange}
        />
        {/* 20 - We create one more, but here we create a buttom surprise me which will be created automatically when calling isSurpriseMe*/}
        <FormField 
        lableName = "Prompt"
        type = "text"
        name = "prompt"
        placeholder = "A man wanders through the rainy streets of Tokyo, with bright neon signs, 50mm"
        value = {form.prompt} 
        handleChange = {handleChange}
        isSurpriseMe
        handleSurpriseMe = {handleSurpriseMe}
        />
      {/* 21 - This div accesses the photo generated and check if it is generated and displays it */}
        <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
          {form.photo ? (
          <img 
          src={form.photo}
          alt={form.prompt}
          className="w-full h-full object-contain"/>
          ) : (
            <img 
            src={preview}
            alt="preview"
            className="w-9/12 h-9/12 object-contain opacity-40" />
          )
          
        }
        {/* 22(up) - If its not generated we display a preview image which is imported from assets*/}
        {/* 23(down) - While its generating we render the loader which is a loading gif */}
        {generatingImg && (
          <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
            <Loader/>
            </div>
        )}

        </div>
        </div>
        {/* 24 - We create a button which on click calls the generate image which feteches the image from api */}
        <div className="mt-5 flex gap-5">
          <button 
            type="button"
            onClick = {generateImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            >
          {/* 25 - While it is generating we generating text */}
              {generatingImg ? 
              'Generating...' : 'Generate'}
              </button>
        </div>
        {/* 26 - Just a paragraph with some text */}
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Once you have created the image you want, you can share it with others in the community
          </p>
        {/* 27 - We created a button to share which doesn't have any functionality yet */}
          <button
          type="submit"
          className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Share with the Community
          </button>
        </div>

        </form>
    </section>
  )
}

export default CreatePost;