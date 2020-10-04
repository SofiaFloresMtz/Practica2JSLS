function resetFields(){
    document.getElementById("Input10").value='';
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
}

function createR() {
    
    //Guardo los datos capturados usando el id de cada control
    var idComida = document.getElementById("Input10").value;
    var nComida = document.getElementById("Input1").value;
    var precio = document.getElementById("Input2").value;
    var ingredientes = document.getElementById("Input3").value;
    var tipoComida = document.getElementById("Input4").value;


    //validaciones
    if (nComida.length > 0) {
        //creo un objeto que guarda los datos
        var comida = {
            idComida,
            nComida,
            precio,
            ingredientes,
            tipoComida,
        }

        var lista_comidas=JSON.parse(localStorage.getItem("Comidas"));

        if(lista_comidas==null)
        { 
            var lista_comidas = [];
        }
        
        const existe = lista_comidas.some(element=>element.idComida==idComida); 

        if(!existe||document.getElementById("Input10").disabled==true)
        {
            
            if(document.getElementById("Input10").disabled==true)
            {
                var lista_comidas=lista_comidas.filter(comida=>comida.idComida!=idComida);

            }
                
            lista_comidas.push(comida);
            var temporal = lista_comidas.sort((a,b) => a.idComida-b.idComida);
            localStorage.setItem("Comidas", JSON.stringify(temporal));
            
            read();
            resetFields();
            swal("Listo!", "Agregado correctamente", "success");

        }
        else
        {
            swal("Error", "Ya existe ese id de comida","warning");
        }

    } 
    else 
    {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input10").disabled = false;
    
}

function read(){
    document.getElementById("Table1").innerHTML='';
    

    const lista_comidas = JSON.parse(localStorage.getItem("Comidas"));
    
     
    if(lista_comidas)
    {
        lista_comidas.forEach((comida)=>printRow(comida));
    }
}


function printRow(comida){
    
    if(comida!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = comida.idComida;
        cell2.innerHTML = comida.nComida;
        cell3.innerHTML = comida.precio; 
        cell4.innerHTML = comida.ingredientes;
        cell5.innerHTML = comida.tipoComida; 
        cell6.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR('${comida.idComida}')">Eliminar</button>`;
        cell7.innerHTML = '<button type="button" style="background-color: #5994D6;" class="btn btn-success" onClick="seekR('+comida.idComida+')">Modificar</button>';
    }
}

function deleteR(idComida){
    const lista_comidas = JSON.parse(localStorage.getItem("Comidas"));
    var temporal=lista_comidas.filter(comida=>comida.idComida!=idComida);
    localStorage.setItem("Comidas", JSON.stringify(temporal));

    if(temporal.length==0)
    { 
        localStorage.removeItem("Comidas");
    }
 
    read();
    
}

function seekR(idComida){

    const lista_comidas = JSON.parse(localStorage.getItem("Comidas"));
    var comida=lista_comidas.filter(comida=>comida.idComida==idComida);
    //console.log(comida[0]);
    updateR(comida[0]);
}

function updateR(comida){
    if(comida!=null)
    {
        document.getElementById("Input1").value=comida.nComida;
        document.getElementById("Input10").value=comida.idComida;
        document.getElementById("Input10").disabled = true;
        document.getElementById("Input2").value=comida.precio;
        document.getElementById("Input3").value=comida.ingredientes;
        document.getElementById("Input4").value=comida.tipoComida;
    }
}


//Para consulta de carrera
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;
  
    const lista_comidas = JSON.parse(localStorage.getItem("Comidas"));
    var ComidasC=lista_comidas.filter(comida=>comida.tipoComida==c);
    if(ComidasC)
    {
        ComidasC.forEach((comida)=>printRowQ(comida));
    }
    //console.log(ComidasC)

}


function printRowQ(comida){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell4.innerHTML = comida.idComida;
    cell1.innerHTML = comida.nComida;
    cell2.innerHTML = comida.precio; 
    cell3.innerHTML = comida.ingredientes;
    cell4.innerHTML = comida.tipoComida; 
   
}
