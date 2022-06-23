import { useEffect, useState } from "react";


const useDeboucedValue = (input: string = '', time: number = 500) => {

     const [deboucedValue, setDeboucedValue] = useState(input);

     useEffect(() => {

          const timeout = setTimeout(() => {
               // cada 500ms voy a estar emitiendo el valor
               setDeboucedValue(input);
          }, time);

          return () => {
               clearTimeout(timeout);
          };

     }, [input]);

     // El useEffect tiene que dispararse cada vez que el input cambie
     // El setTimeout hace que si yo vuelvo a disparar un cambio
     // este, el cambio, va a disparar el return del useEffect anterior

     // Redondeando
     // cada vez que el useEffect se dispara se crea una nueva instancia de un timeout 
     // y la instancia anterior la va limpiar por lo cual el setDeboucedValue nunca se va a llamar, 
     // al menos que se cumpla con el tiempo preestablecido

     return deboucedValue;
};

export default useDeboucedValue;
