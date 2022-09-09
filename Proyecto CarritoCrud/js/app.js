const listaCursos = document.querySelector('#lista-cursos');
const carrito = document.querySelector('#carrito');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
let articulos = [];

cargarEventListeners();

function cargarEventListeners() {

    //Agrega curso al apretar boton Agregar al carrito
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito 
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito
    btnVaciarCarrito.addEventListener('click', vaciarCarrito);
}

//Agrega el curso elegido

function agregarCurso(e) {

    e.preventDefault();

    if(e.target.classList.contains( 'agregar-carrito' )) {

        //Recibe el div padre del curso elegido 
        const cursoElegido = e.target.parentElement.parentElement;
        leerDatosCurso( cursoElegido );
    }
}

//Elimina el curso del carrito

function eliminarCurso(e) {

    e.preventDefault();

    if(e.target.classList.contains( 'borrar-curso' )) {
        const cursoId = e.target.getAttribute( 'data-id' ); 

        //Elimina de articulos por el data-id
        articulos = articulos.filter( curso => curso.id !== cursoId );
        
        //Crea el nuevo HTML con los articulos eliminados 
        carritoHTML();
    }
}

function vaciarCarrito(e) {

    if(articulos.length !== 0) {
        
        articulos.length = 0; 
        //Limpia el HTML 
        limpiarHTML();

    } else {
        alert('No has agregado cursos en el carrito.')
    }
}


//Lee los datos del curso y los almacena

function leerDatosCurso( curso ) {

    //Objeto con la info del curso elegido
    const infoCurso = {
        id: curso.querySelector('a').getAttribute('data-id'),
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        tutor: curso.querySelector('p').textContent,
        precio: curso.querySelector('.precio span').textContent,
        cantidad: 1
    }

    //Revisa si un elemento existe en el carrito 
    const existe = articulos.some( curso => curso.id === infoCurso.id );
    if( existe ) {
        //Actualiza la cantidad 
        const cursos = articulos.map( curso => {
            if( curso.id === infoCurso.id ) {
                curso.cantidad++;
                return curso;   //retorna el objeto actualizado
            } else {
                return curso;   //retorna los objetos que no son los duplicados 
            }
        });
        articulos = [...cursos]
    } else {
        //Agrega los cursos elegidos al array articulos
        articulos.push( infoCurso )
    }

    carritoHTML();
}

//Crea el HTML con la info del curso y lo muestra en el carrito

function carritoHTML() {

    limpiarHTML();  //primero limpia el HTML 

    articulos.forEach( curso => {

        const { imagen, titulo, precio, cantidad, id } = curso;
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td> 
                <img src=${imagen} width="100">    
            </td>
            <td> 
                ${titulo}
            </td>
            <td> 
                ${precio}
            </td>
            <td> 
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}" > X </a>
            </td>
        `;

        listaCarrito.appendChild( fila );

    })
}

//Elimina los cursos del tbody
function limpiarHTML() {
    
    //Elimina todos los hijos hasta que esté vacío 
    while( listaCarrito.firstChild ) {
        listaCarrito.removeChild( listaCarrito.firstChild );
    }
}