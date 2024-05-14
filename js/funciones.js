$(function(){ 
    $("#mis-datos").validate({ 
        rules:{
            nombre:{
                required: true
            },
            correo:{
                required: true,
                email:true
            },
            telefono:{
                required:true,
                number:true
            },
            fecha:{
                required:true
            },
            region:{
                required:true
            },
            comuna:{
                required: true
            },
            direccion:{
                required:true
            },
            pass1:{
                required:true
            },
            pass2:{
                required:true,
                equalTo:"#pass1"
            },

        }//rules
    })//fin de validate
})//fin de la función

$(function(){ 
    $("#feedback-form").validate({ 
        rules:{
            nombre:{
                required: true
            },
            correo:{
                required: true,
                email:true
            },
            categoria:{
                required:true
            },
            comentarios:{
                required:true
            },
        }
    })
})

function mostrarPass() {
    var x = document.getElementById("pass1");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  function mostrarPass2() {
    var x = document.getElementById("pass2");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

        const regionSelect = document.getElementById('region');
        const comunaSelect = document.getElementById('comuna');

        function llenarRegiones(data) {
            if (Array.isArray(data)) {
                data.forEach(region => {
                    const opcion = document.createElement('option');
                    opcion.value = region.nombre;
                    opcion.textContent = region.nombre;
                    regionSelect.appendChild(opcion);
                });
            } else {
                console.error('Datos de regiones no válidos:', data);
            }
        }

        function llenarComunas() {
            const regionSeleccionada = regionSelect.value;
            comunaSelect.innerHTML = '<option value="">Seleccione una comuna...</option>';
            if (regionSeleccionada) {
                fetch('http://localhost:3300/regiones')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error en la respuesta de la API');
                        }
                        return response.json();
                    })
                    .then(data => {
                        if (Array.isArray(data)) {
                            const region = data.find(region => region.nombre === regionSeleccionada);
                            if (region && Array.isArray(region.comunas)) {
                                region.comunas.forEach(comuna => {
                                    const opcion = document.createElement('option');
                                    opcion.value = comuna;
                                    opcion.textContent = comuna;
                                    comunaSelect.appendChild(opcion);
                                });
                            } else {
                                console.error('Región no encontrada o sin comunas:', regionSeleccionada);
                            }
                        } else {
                            console.error('Datos de comunas no válidos:', data);
                        }
                    })
                    .catch(error => console.error('Error al obtener las comunas:', error));
            }
        }

        regionSelect.addEventListener('change', llenarComunas);

        document.addEventListener('DOMContentLoaded', () => {
            fetch('http://localhost:3300/regiones')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en la respuesta de la API');
                    }
                    return response.json();
                })
                .then(data => {
                    if (Array.isArray(data)) {
                        llenarRegiones(data);
                    } else {
                        console.error('Datos de regiones no válidos:', data);
                    }
                })
                .catch(error => console.error('Error al obtener las regiones:', error));
        });

function mostrarComentarios(){
    let url='https://jsonplaceholder.typicode.com/comments';
        fetch(url)
        .then(response => response.json())
        .then(data => mostrarData(data))
        .catch(error => console.log(error))
        
    const mostrarData=(data)=>{
        console.log(data)
        let body=""
        for(var i=0; i<data.length; i++){
            body+=`<tr>
                <td>${data[i].name}</td>
                <td>${data[i].body}</td>
                </tr>`
        }
                document.getElementById('comentarios').innerHTML=body
     }
}