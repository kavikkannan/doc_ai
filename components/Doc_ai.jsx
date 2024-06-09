'use client';
import { useState, useRef } from 'react';

export default function DocAi() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [hasUploaded, setHasUploaded] = useState(false); 
  const [showPopup, setShowPopup] = useState(false); 
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hasUploaded) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 1200);
      return;
    }

    const newMessage = { prompt, response: 'Loading...' };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setPrompt('');
    
    setTimeout(() => {
      const finalMessages = updatedMessages.map((msg, index) => 
        index === updatedMessages.length - 1 ? { ...msg, response: 'The document is about a receipt in German with all details.' } : msg
      );
      setMessages(finalMessages);
    }, 1000);
  };

  const handleTextareaChange = (e) => {
    setPrompt(e.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = '3rem'; 
    const scrollHeight = textarea.scrollHeight;
    const newHeight = Math.min(scrollHeight, 160); 
    textarea.style.height = `${newHeight}px`;
  };

  return (
    <div className="min-h-screen flex flex-row items-center text-white">
      <div className='bg-pp flex flex-col p-10 gap-10 justify-end h-screen w-[15%]'>
        <div className='flex'>
          <button
            type="button"
            className="border-none"
            onClick={() => setHasUploaded(!hasUploaded)} 
          >
            <img src="/images/attachment.png" alt="update icon" className='w-7' />
          </button>
          <h2 className="p-2 hover:translate-x-3 hover:transition-transform hover:ease-out delay-400 hover:text-bb text-white">
            {hasUploaded ? "Try with anot PDF" : "Upload the PDF here"}
          </h2>
        </div>
        <div className="flex items-center gap-2 bottom-4 left-4">
          <img src="/images/share.png" alt="update icon" className='w-7' />
          <a href="#" className="hover:translate-x-3 hover:transition-transform  hover:text-bb text-white">Updates & FAQ</a>
        </div>
        <div className="flex gap-2 bottom-4 left-4">
          <img src="/images/logout.png" alt="update icon" className='w-7' />
          <a href="#" className="hover:translate-x-3 hover:transition-transform hover:ease-out delay-400 hover:text-bb text-white">Log out</a>
        </div>
      </div>
      <div className="w-[85%] h-screen flex flex-col bg-bb mx-auto p-4">
        <div className='h-10'>
          {showPopup && (
            <div className='flex justify-center items-center animate-pulse'>
              <div className="p-4 bg-rr text-white text-center rounded-full">
                <h2>
                  Please upload the PDF first!
                </h2>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col flex-grow mt-16 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className='flex justify-center pt-20 h-[30%]'>
                <h1 className="text-7xl text-rr mt-8">DocAI</h1>
              </div>
              <div className='flex flex-col items-center pt-16 gap-5 pb-7'>
                <img src="/images/sun.png" alt="update icon" className='w-7 hover:animate-spin hover:bg-pp' />
                <h2 className='text-xl'>Examples</h2>
              </div>
              <div className='flex justify-center h-[25%]'>
                <div className="grid grid-cols-1 sm:grid-cols-3 w-[75%] gap-4 text-center">
                  <button className="bg-pp hover:shadow-2xl hover:shadow-pp text-white py-4 px-6 rounded-xl">
                    "Explain quantum computing in simple terms" →
                  </button>
                  <button className="bg-pp hover:shadow-2xl hover:shadow-pp text-white py-4 px-6 rounded-xl">
                    Remembers what user said earlier in the conversation
                  </button>
                  <button className="bg-pp hover:shadow-2xl hover:shadow-pp text-white py-4 px-6 rounded-xl">
                    "How do I make an HTTP request in Javascript?" →
                  </button>
                  <button className="bg-pp hover:shadow-2xl hover:shadow-pp text-white py-4 px-6 rounded-xl">
                    "Got any creative ideas for a 10 year old's birthday?" →
                  </button>
                  <button className="bg-pp hover:shadow-2xl hover:shadow-pp text-white py-4 px-6 rounded-xl">
                    Allows user to provide follow-up corrections
                  </button>
                  <button className="bg-pp hover:shadow-2xl hover:shadow-pp text-white py-4 px-6 rounded-xl">
                    Allows user to provide follow-up corrections
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className=" flex flex-col flex-grow overflow-y-auto p-4">
              {messages.map((msg, index) => (
                <div key={index} className="mb-1">
                  <div className='flex gap-2 items-center p-2'>
                  <img src="/images/user.png" alt="update icon" className='w-8  ' />
                  <p className="text-xl mb-2 w-full  p-4 rounded-xl text-left">{msg.prompt}</p>
                  </div>
                  <div className='flex gap-2 items-center p-2'>
                  <img src="/images/ai.png" alt="update icon" className='w-7' />
                  <p className="text-xl bg-bb-light p-4 rounded-xl text-right">{msg.response}</p>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='flex fixed bottom-0 w-[85%] h-[25%] justify-center items-end pb-10'>
          <form onSubmit={handleSubmit} className="mt-8 flex h-fit max-h-[12rem] bg-pp justify-center gap-5 w-[70%] rounded-3xl p-2 resize-none overflow-y-auto">
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={handleTextareaChange}
              placeholder="Enter the prompt"
              className="p-2 flex-1 bg-transparent border-none focus:outline-none h-[3rem] text-white placeholder-white rounded-xl resize-none overflow-y-auto"
              style={{ minHeight: '3rem', maxHeight: '10rem' }}
              rows="1"
            />
            <button
              type="submit"
              className="p-2 border-none text-white"
            >
              <img src="/images/send.png" alt="send icon" className='w-5' />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
