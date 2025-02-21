'use client';

import { Button, Cell } from '@telegram-apps/telegram-ui';
import { useRef, useState, useEffect } from "react";

import { Camera, Send } from 'lucide-react';

import { PinataSDK } from "pinata-web3";
import { supabase } from "@/lib/supabaseClient";

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT!,
  pinataGateway: "gray-tough-gull-222.mypinata.cloud",
});

function dataURLtoBlob(dataURL:string) {
  const byteString = atob(dataURL.split(',')[1]);
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];

  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
  }

  return new Blob([uint8Array], { type: mimeString });
}

export default function CameraComponent() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState('');
  const [stream, setStream]:any = useState(null);

  async function uploadToDatabase(cid:string) {
    const { data, error } = await supabase.from("post").insert({
      cid_ipfs: cid,
      created_by: 1
    })
    console.log(data)
  }

  async function main() {
    try {
      const blob = dataURLtoBlob(photo)
      const file = new File([blob], "image.png", { type: "image/png" });
      console.log(process.env.NEXT_PUBLIC_PINATA_JWT)
      const upload = await pinata.upload.file(file);
      console.log(upload);
      uploadToDatabase(upload.IpfsHash)
    } catch (error) {
      console.log(error);
    }
  }
  

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track:any) => track.stop());
      setStream(null);
    }
  };
  

  useEffect(() => {    
    async function startCamera() {

      try {
        stopCamera()

        console.log('uwu')
        console.log('waf')

        const constraints = {
          video: true //{ facingMode: "environment" } // "environment" 
        };
        navigator.mediaDevices.getUserMedia({ video: true })
        .then((mediaStream) => {
          if(videoRef.current) (videoRef.current as any).srcObject = mediaStream;
          setStream(mediaStream);
        })
        .catch((err) => {
          alert("Accès caméra refusé :"+ err);
          alert("Veuillez autoriser l'accès à la caméra dans les paramètres !");
        });
      } catch (err) {
        console.error("Erreur accès caméra :", err);
      }
    }
    
    setTimeout(() => {
      startCamera();
    }, 1000);

    return () => {
      if (stream) {
        stream.getTracks().forEach((track:any) => track.stop());
      }
    };
  }, []);

  const takePhoto = () => {
    const video: any = videoRef.current;
    const canvas: any = canvasRef.current;
    if(canvas) {
      const ctx = canvas.getContext("2d");

      if(video) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }


      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = canvas.toDataURL("image/png");
      setPhoto(imageData);
    }
  };


  return (
    <div className="flex flex-col items-center gap-4">
        {!photo && <video ref={videoRef} autoPlay playsInline muted className="w-full max-w-md rounded-lg shadow-md" />}
        <canvas ref={canvasRef} className="hidden" />
        {photo && <img src={photo} alt="Captured" className="mt-4 rounded-lg shadow-md w-full" />}
        <Cell>
            {photo && <Button
                onClick={() => main()} 
                before={<Send />}
                mode="bezeled"
                size="l"
            >
                Submit
            </Button>}
            {!photo && <Button
                onClick={takePhoto} 
                before={<Camera />}
                mode="bezeled"
                size="l"
            >
                Take a Picture
            </Button>}
        </Cell>
    </div>
  );
}