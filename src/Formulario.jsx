import { useState } from "react"


function Formulario({crearColor}){

    let [textoTemporal, setTextoTemporal] = useState("") //value del input text
    let [error, setError] = useState(false)
    let [textoError, setTextoError] = useState("")

    function validar(evento){
        
        evento.preventDefault()
      
        setError(false)

        setTextoError("debe escribir tres número entre 0-255, separados por comas")

        if(/^(\d{1,3},){2}\d{1,3}$/.test(textoTemporal)){
            
            let [r,g,b] = textoTemporal.split(",").map(n => Number(n))

            let valido = true;

            [r,g,b].forEach(n => valido = valido && n <= 255)

            if(valido){

             return fetch("https://api-colores-mongo-2k1k.onrender.com/nuevo", {
                    method: "POST",
                    body: JSON.stringify({r,g,b}),
                    headers: {
                        "Content-type" : "application/json"
                    }
                })
                .then(respuesta => respuesta.json())
                .then(({id, error}) => {
                    //console.log(id);
                    if(!error){
                        setTextoTemporal("")
                        return crearColor({id,r,g,b})
                        
                    }
            
                    console.log("...error al usuario");
                });
            }

            setTextoError("Números fuera de rango (0-255)")

        }

        setError(true)
    }

    return (
        <form onSubmit={ validar }>
            <input type="text" placeholder="rrr,ggg,bbb" value={textoTemporal} onChange ={evento => setTextoTemporal(evento.target.value)} />
            <p className= {`error ${ error ? "visible" : ""}`}>{ textoError }</p>
            <input type ="submit" value="crear color" />
        </form>
    )
}

export default Formulario