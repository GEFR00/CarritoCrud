const listaCursos = document.querySelector('#lista-cursos');
const carrito = document.querySelector('#carrito');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
let articulos = [];

cargarEventListeners();

function cargarEventListeners() {

    //Agrega curso al apretar boton Agregar al carrito
    listaCursos.addEventListener('click', agregarCurso);
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

//Lee los datos del curso y los almacena

function leerDatosCurso( curso ) {
    // console.log(curso)

    //Objeto con la info del curso elegido
    const infoCurso = {
        id: curso.querySelector('a').getAttribute('data-id'),
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        tutor: curso.querySelector('p').textContent,
        precio: curso.querySelector('.precio span').textContent,
        cantidad: 1
    }

    //Agrega los cursos elegidos al array articulos
    articulos.push( infoCurso )

    // console.log(infoCurso);
    console.log(articulos);

    carritoHTML();
}

//Crea el HTML con la info del curso y lo muestra en el carrito

function carritoHTML() {

    limpiarHTML();  //primero limpia el HTML 

    articulos.forEach( curso => {

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td> 
                ${curso.titulo}
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