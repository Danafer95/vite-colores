import {useState, useEffect} from 'react'
import Formulario from "./Formulario"
import Item from "./Item"


function Colores(){

    let [colores, setColores] = useState([]);

    useEffect(()=> {
        fetch("https://api-colores-mongo-2k1k.onrender.com/colores")
        .then(respuesta => respuesta.json())
        .then(colores => setColores(colores))
    }, [])

    function crearColor(color){
        //console.log(colores, color)
        setColores([...colores, color])
    }
    
    function borrarColor(colorId){

        let borrarID = { id: colorId };

        //En este caso Joaquin ha puesto el fetch directamente en ITEM, pensadolo como un objeto que tiene sus propias funcionalidades. Es igual valido ponerlo aquí.
  
        fetch("https://api-colores-mongo-2k1k.onrender.com/borrar", {
            method: "DELETE", 
            body : JSON.stringify(borrarID),
            headers : {
                "Content-type" : "application/json"
            }
        })
        .then(respuesta => respuesta.text())
        .then(respuesta =>{
            setColores(colores.filter( color => color.id != colorId))
            console.log(respuesta); 
        });

        
    }

    return (
        <>
            <Formulario crearColor={crearColor} />
            <ul>
                {colores.map( ({id,r,g,b}) =>  <Item 
                                                    key={id} 
                                                    id={id}
                                                    r={r} 
                                                    g={g} 
                                                    b={b}
                                                    borrarColor={borrarColor}
                                                /> )}
            </ul>
        </>
    )
}


export default Colores