// Espero a que el documento se encuetre completamente cargado

$(document).ready(()=>{


  // runInizialite();
  /*
  *   Agrego un evento de escucha de click a todos los objetos que se encuentren
  *  dentro del DOM y tengan la clase .theme-filter.
  *
  *  paso al objeto cliqueado en la funcion anonima, en forma de arrow function
  *
  */
  $('.theme-filter').click((e)=>{
    /*
    *  Elimino la clase active a todos los elementos del menu
    */



    // Remuevo la pantalla de bienvenida


    $('#theme-home').css({'display':'none'});

    $('.theme-filter').removeClass('theme-active')

    // Agrero la clase activa al elemento cliqueado
    $(e.currentTarget).addClass('theme-active')
    /*
    *   El objeto recibido por el click le extraigo su atributo themeFilter con
    *   javaScript.
    *
    */

    e = e.currentTarget.dataset.themeFilter;
    /*
    *   pregunto si el data-filter fue igual a 'todo'
    *   en caso de ser asi, aplico css a todos para ver todas las categorias,
    *  en caso de no ser asi, paso el parametro a la funcion de filtrado de tema
    *
    *
    *  Para una presentacion del codigo mas amena, utilizo un if ternario
    */


    //lo que evaluo  ? lo que hago sí si : lo que hago sí no
    (e=="todo") ? $('section').css({'display':'block'}) : filterTopic(e);
  })


// Creo la funcion de filtrado de temas
  function filterTopic(e) {
    /*
    *    busco todos los elementos de <section> en el DOM y con la funcio each()
    *    le pregunto a cada uno si es o no el elemto cliqueado para asi hacer
    *    el cambio en el css del elemto y mostrarlo o no en pantalla
    */
        $('section').each(function(index, element){
          //lo que evaluo  ? lo que hago sí si : lo que hago sí no
          (e==$(element).data("theme-type")) ? $(element).css({'display':'block'}) : $(element).css({'display':'none'});
        })
    }


    /*
    *
    *          Filtrado por dia
    *
    *
    */



// Agrego un listener al boton llamado #theme-filter-date

  $('#theme-filter-date').click(()=>{

    // asigno el valor de la fecha seleccionada a un array
    date = $('#theme-input-filter-date')[0].value.split('-');

    // Genero una fecha con el formato deseado
    fullDate=date[2]+"/"+date[1]+"/"+date[0];


//  paso a la funcion convertDate los valores del dia de hoy y la fecha seleccionada

    today = convertDate(new Date());
    daySelected = convertDate(new Date(date));


// pregunto si la fecha seleccionadaes una fecha valida

    if(fullDate!=='undefined/undefined/'){
      // En caso de ser asi quito la pantalla de bienvenida de la seccion visible
      $('#theme-home').css({'display':'none'})
      // recorro cada uno de los elementos con clase theme-card-news
      $('.theme-card-news').each(function(index,element){

        // para evitar duplicado de clases primero elimino de la vista todas las noticias
        $(element).addClass('theme-no-show-news')
        $(element).removeClass('theme-show-news')


      // verifico que la fecha seleccionada y la del dia de hoy sean iguales
        if(today === daySelected){
          // en caso verdadero Agrego a las noticias con valor de creacion 'today' el css correspondiente para mostrarlos en pantalla y elimino de la vista los demas
          $(element).data("created")==='today' ? $(element).addClass('theme-show-news') : $(element).addClass('theme-no-show-news');
        }else{
          // en caso contrario descarto todos los elementos que tengan de fecha de creacion 'today' para evitar errores de conversion
          if($(element).data("created")!=='today'){
            // paso a la funcion convertDate() los valores de cada elemento y verifico que sea la fecha seleccionada para mostrarlos o esconderlos
            convertDate(new Date($(element).data("created")))===daySelected ? $(element).addClass('theme-show-news') : $(element).addClass('theme-no-show-news');
          }
        }

      })
      }






  })

/*
        destruccion del filtro de fechas

*/

// Agrego un listener al boton correspondiente
  $('#theme-destroy-filter-date').click(function(){
    // elimino de pantalla la pantalla de bienvenida
    $('#theme-home').css({'display':'none'})
    // recorro cada noticia para hacerlas visibles
    $('.theme-card-news').each(function(index,element){
      $(element).addClass('theme-show-news');
      $(element).removeClass('theme-no-show-news');
    })
  })


// Conversion de las fechas en el mismo formato
  function convertDate(date){
    // obtengo el dia, mes y año de la fecha seleccionada
    day = date.getDate();
    month = date.getMonth();
    year = date.getFullYear();

    // regreso la fecha moldeada

    return day+"/"+month+"/"+year

  }


})




/*
*
*          Creacion de las noticias
*
*          La funcion recibe las variables enviadas por assigner.js
*
*
*
*/


function createCard(tittle, subtittle, content,image,category,createdAt, dataCreated){


  // Creo los elementos de HTML mediante Jquery asignando el mismo molde a cada noticia

  let collg12 = $("<div>", {'class':'col-lg-12 theme-card-news','data-created':dataCreated})
  let row = $("<div>", {'class':'row'})
  let colsm9 = $("<div>", {'class':'col-lg-9'})
  let h4 = $("<h4>", {'text':category,'class':'theme-'+category+' theme-category-News'})
  let h3 = $("<h3>", {'text':tittle})
  let h5 = $("<h5>", {'style':'color:#1fa06b; margin-bottom: 20px;','text':subtittle})
  let contentNew = $("<p>", {'style':'text-align: justify','text':content})
  let create = $("<p>", {'class':'theme-createdAt','text':createdAt})
  let themeCardBody = $("<div>", {'class':'col-lg-3 theme-card-body'})
  let img = $("<img>", {'class':'img-fluid img-thumbnail','src':image})




/*
*    Acoplo cada uno de los elementos creardos a su correspondiente contenedor
*    asi como en su respectivo orden
*/

  $(colsm9).append(h4)
  $(colsm9).append(h3)
  $(colsm9).append(h5)
  $(colsm9).append(contentNew)
  $(colsm9).append(create)

  $(themeCardBody).append(img)

  $(row).append(colsm9)
  $(row).append(themeCardBody)

  $(collg12).append(row)
  $(collg12).append('<hr>')

/*
*
*    Una vez acoplado el contenedor y construido correctamente lo develvo a assigner.js
*    quien lo asignara a un espacio especifico de la pagina web.
*/


return collg12;


}
