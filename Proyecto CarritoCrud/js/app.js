const listaCursos = document.querySelector('#lista-cursos');
const carrito = document.querySelector('#carrito');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
let articulos = [];

cargarEventListeners();

function cargarEventListeners() {
    listaCursos.addEventListener('click', agregarCurso)
}

function agregarCurso(e) {
    e.preventDefault();

    if(e.target.classList.contains( 'agregar-carrito' )) {
        const cursoElegido = e.target.parentElement.parentElement;
        leerDatosCurso( cursoElegido )
    }
}

function leerDatosCurso( curso ) {
    console.log(curso)

    const infoCurso = {
        id: curso.querySelector('a').getAttribute('data-id'),
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        tutor: curso.querySelector('p').textContent,
        precio: curso.querySelector('.precio span').textContent,
        cantidad: 1

    }

    articulos.push( infoCurso )

    // console.log(infoCurso);
    console.log(articulos);
}