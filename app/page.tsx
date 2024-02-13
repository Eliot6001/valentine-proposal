"use client"
import { useEffect, useState, useRef } from 'react'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import no1 from './gifs/No-1.gif';
import no2 from './gifs/No-2.gif';
import no3 from './gifs/No-3.gif';
import no4 from './gifs/No-4.gif';
import no5 from './gifs/No-5.gif';
import fail from './gifs/fail.gif';
import randomClick from './gifs/randomClick.gif';
import wait from './gifs/wait.gif';
import win from './gifs/win.gif';
import yes from './gifs/yes.gif';
import yesResponse from './gifs/yesResponse.gif';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { LoadingSpinner } from './loadingSpinner';

type AllowedImages = StaticImageData;
type StaticImageData = {
  src: string;
} | string;
//Mostly done as a joke so i didn't mind having some "conventions breaking" code
//I don't own any of the gifs used.

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const [yesclicks, setYesclicks] = useState(0);
  const [noclicks, setNoclicks] = useState(0);
  const [angry, setAngry] = useState<boolean>(false);
  const [h1text, setH1text] = useState<string>('Will you be my valentine?');
  const [preloading, setPreloading] = useState<AllowedImages>(wait);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState<AllowedImages>(wait);
  const mainRef = useRef(null);
  const images = {
    'no1': no1,
    'no2': no2,
    'no3': no3,
    'no4': no4,
    'no5': no5,
    'fail': fail,
    'randomClick': randomClick,
    'wait': wait,
    'win': win,
    'yes': yes,
    'yesResponse': yesResponse,
  };
  type ImageMap = {
    [key: string]: StaticImageData;
  };
  const handleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === mainRef.current) {
      setCurrentImage(images['randomClick'])
      setClicked(!clicked);

    }
  }
  useEffect(() => {
      Object.values(images).forEach(image => {
        setPreloading(image);
      });
      setLoading(false);
  }, [])
  useEffect(() => {
    switch (currentImage) {
      case no1:
        setH1text("fine, i don't care anyway, u sure..?")
        break;
      case no2:
        setH1text("i don't care, u sure tho...?");
        break;
      case no3:
        setH1text("please, u sure?")
        break;
      case no4:
        setH1text("W-would u consider?")
        break;
      case no5:
        setH1text("fine... ")
        break;
      case randomClick:
        setH1text("better reply~")
        setAngry(true);
        break;
      case win:
        setH1text("Y-yay")
        break;
      case yes:
        setH1text("Y-you sure?")
        break;
      case yesResponse:
        setH1text("im in luv~ ")
        break;
      default: //gonna be wait
        setH1text("Will you be my valentine?");
        setCurrentImage(wait);
        break;
    }

  }, [clicked])
  const noButtonCounter = () => {
    const noImages = ['no1', 'no2', 'no3', 'no4', 'no5'];
    setAngry(false);
    setYesclicks(0);
    if (noclicks < 4) {
      setNoclicks(noclicks => noclicks + 1);
    }
    else { setNoclicks(0); }
    //@ts-ignore
    setCurrentImage(images[noImages[noclicks]]);
    console.log(noclicks, "noclicks");
    setClicked(!clicked)
  }
  const yesButtonCounter = () => {
    const yesImages = ['yes', 'yesResponse', 'win']
    setAngry(false);
    setNoclicks(0)
    if (yesclicks < 3) {
      setYesclicks(yesclicks => yesclicks + 1);
    }
    else {
      setYesclicks(0)
    }

    console.log(yesclicks, "yesclicks");
//@ts-ignore
    setCurrentImage(images[yesImages[yesclicks]]);
    setClicked(!clicked);

  }


  return (
    <div className={`h-lvh w-full flex flex-col justify-center items-center m-auto space-y-6 ${angry ? 'bg-red-500 transition-all duration-150' : 'bg-white'}`} 
    onClick={handleOnClick} ref={mainRef}>

      {!loading && 
      <>
      <Image priority src={currentImage as string} 
      alt="gif-responses" className="w-2/5 h-2/5 object-contain" 
      loading={"eager"} 
      />
      <h1 className="question text-7xl">{h1text}</h1>
      <div className="space-x-16">
        <Button className="w-32 h-12 text-2xl z-10" onClick={yesButtonCounter}> Yes </Button>
        <Button className={"w-32 h-12 text-2xl z-10"} onClick={noButtonCounter}

        > No </Button>
      </div>
      </>
      }
      {loading &&<><LoadingSpinner className="w-100 h-100"/>
      <Image priority src={preloading as StaticImport} alt="preloading" width={0} height={0} className="hidden"/> </> }
     
    </div>
  );
}
