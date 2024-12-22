"use client"
import GifGrid from "./ui/gif-grid";
import { useEffect, useState } from "react";

export default function Home() {
  const [inputQuery, setInputQuery] = useState(''); // введенный текст из тэга input
  const [gifQuery, setGifQuery] = useState(''); // значение передаваемое в GifGrid
  const [messages, setMessages] = useState<{ text: string | React.ReactNode; time: string }[]>([]); // сообщения из message box
  const [isGifChoosing, setGifChoosing] = useState(false); // флаг для проверки на активное окно: message box или gif grid
  
  useEffect(() => { 
    if (inputQuery.startsWith("/gif")) { // проверка при каждом изменении введеного текста inputQuery 
      setGifChoosing(true);
      setGifQuery(inputQuery.slice(5).trim()); // с 5-го символа чтобы нельзя было обрабатывать запросы типа /gifcat
    } else {
      setGifChoosing(false);
    }
  }, [inputQuery]); 
  
  const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => { // запоминаем введенное значение inputQuery
    setInputQuery(e.target.value);
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => { // нажатием enter при фокусе на input отправляем сообщение 
    if (e.key === 'Enter' && inputQuery.trim() !== '') {
      const newMessage = {
        text: inputQuery.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages([...messages, newMessage]);
      setInputQuery('');
    }
  };
  
  const onGifClick = (gifUrl: string) => { // обработка события клика по gif из gif grid
    const newMessage = {
      text: <img src={gifUrl} alt="gif" className="h-[220px] w-auto object-contain rounded-[6px]" />, // высота gif взята из figma, ширину масштабируем под нее
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputQuery('');
  };

  return (
    <div className="flex flex-col justify-center items-end bg-white w-[437px] h-[340px] rounded-[4px]">
      <div>
      {isGifChoosing ? // проверка какой div отображать - gif grid или message box
      (
        <div className="h-[248px] w-[404px] mt-[22px] mx-auto mb-2 flex justify-center items-center 
        rounded-1px border-gray-300 border-1 overflow-y-scroll scrollbar-thumb-[#dae2ea]">
          <div className="h-full w-full flex justify-center pl-[10px] pr-[20px] mt-4">
            <GifGrid query={gifQuery} onGifSelect={onGifClick} />
          </div>
        </div>
      ):(
        <div className="h-[248px] w-[404px] mt-[22px] mx-auto mb-2 flex flex-col space-y-2 justify-end overflow-auto">
        {messages.map((message, index) => (
            <div
              key={index}
              className=" bg-white space-x-2 rounded-[6px]  w-auto whitespace-normal flex items-end">
              <span className="text-[#828282]">{message.text}</span>
              <span className="text-[#99a2ad] text-[13px] leading-[17px]">{message.time}</span>
            </div>
          ))}
        </div>
      )}
      <div className="relative w-[437px] h-[62px] bg-[#fafbfc] flex justify-center items-center border-[#dce1e5] border-t-1 
      border-solid rounded-b-[4px] flex-shrink-0 py-[13px] px-[16px]">
        <input className=" last:bg-white rounded-[6px] text-black placeholder-[#828282] border-[#d3d9d3] border-1 
        border-solid focus:ring-1 font-roboto text-[13px]  focus:ring-gray-400 focus:outline-none w-full h-[36px] pl-3 leading-[17px]" 
        type="text" 
        value={inputQuery}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        placeholder="Напишите сообщение..."/>
          {isGifChoosing && 
          <div className="absolute font-roboto text-[13px] mr-[361px] 
          font-bold bg-colored-gif text-transparent bg-clip-text"> 
            <div className="">/gif</div> 
          </div>}
      </div>
    </div>
    </div>
  );
}
