import { useState } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";

const TextContainer = () => {
  const [open, setOpen] = useState(false);
  console.log(open, "open");
  return (
    <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
      <h1 className="text-4xl text-red-500 font-bold tracking-tight sm:text-6xl">
        Treine, Supere, Conquiste
    </h1>
      <p className="mt-6 text-lg leading-8 sm:max-w-md lg:max-w-none">
        Bem-vindo à FitZone – Sua Zona de Performance.
        Na FitZone, você encontra tudo o que precisa para alcançar o seu melhor: desde suplementos como creatina até roupas fitness de alta performance.
        Potencialize seus treinos e eleve seu estilo com nossos produtos selecionados para quem vive o mundo fitness.
      </p>
      <div className="w-1/2 mt-4">
        <Button
          text="Show more"
          type="button"
          handleClick={() => setOpen(!open)}
        />
      </div>
      <Modal open={open} setOpen={setOpen} />
    </div>
  );
};

export default TextContainer;
