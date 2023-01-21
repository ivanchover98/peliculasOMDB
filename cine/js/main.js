
//Código en general

//He creado 3 funciones. 1 para conseguir todas las películas en funciómn del título que se le pase
// 2. Otra que entrega información más concreta sobre la película en sí y otra 3era fuinción para poder enlazar por id
// la película que queremos ver en más detalle
// Las dos primeras funciones mencionadas realizan una petición a una api, y en función de los parámetros pasados por una URL
// nos extrae información al respecto.




// Posibles entradas y handlers

//Hemos querido cubrirnos las espaldas y hemos cubierto toda clase de inputs que le podamos llegar a insertar en el "searchBox",
// o input que realiza la búsqueda de películas.
//En primer lugar solo podemos escribir texto en el input, gracias a los handlers propios de html
//En segundo lugar tenemos una estructura "if-else" que permite el mostrar información en función del "Response" que nos ofrezca la página
//Y en función de cada response, ofrecemos una u otra información
// Y en tercer lugar, tenemos un handler propio de la función $.getJSON, que desvia todas las peticiones que no se puedan realizar a la "api"
//hacia un "alert". Esto es beneficioso para evitar ataques Crossite XSS.

//Petición AJAX
//La petición  ajax se hace un función de:
// 1 API key, que nos la brinda la propia página web por correo electrónico
// Unos cuantos parámetros que definimos con antelación o por medio del valor de un formulario HTML
// Y un foreach, que nos permite, que por cada película, nos imprima un "card" con la información correspondiente.


// Posters en el resultado
//Se dispone de posters en los "card" pero además, si esta película no tiene imagen/poster, nosotros le brindamos una, para que
// el formato de la página no se vea comprometido.

//JQuery effects
//Utilizamos el fadeIn() para poder mostrar la información de un modo menos agresivo.

$(document).ready(function(){
    let apiKey = "13d0831a";
    $("#searchButton").click(function(){
        let movieTitle = $("#search").val();
        let mType = $("input[name='radio']:checked").val();
        let movieYear =$("#year").val();
        getMovies(movieTitle, mType, movieYear);
    });
})

function getMovies(movieTitle, mType, movieYear){
        let apiURL = `https://www.omdbapi.com/?apikey=13d0831a&s=${movieTitle}&y=${movieYear}&type=${mType}`;
        $.getJSON(apiURL, function (data){
                console.log(data);
                let output = ``;
                if(data.Error == "Incorrect IMDb ID."){
                    alert("Please insert a name's film")
                }
                else if (data.Error == "Movie not found!" || data.Error == "Series not found!"){
                    alert("Film/Serie not found")
                }
                else if (data.Error == "Too many results."){
                    alert("You can't look that way... ")
                }
                else {
                    $.each(data.Search, (index, movie) => {
                        if (movie.Poster !== "N/A") {
                            image = movie.Poster
                        } else {
                            image = "imgs/noimage";
                        }
                        output += `
                      <div class="card border border-1 m-2" style="width: 18rem;">
                          <div class="card-body d-flex justify-content-center">
    
                              <ul class="list-group list-group-flush">
                                  <li class="list-group-item"><img class="card-image img-fluid" style="width: 300px; height: 350px;" src=${image}></li>
                                  <li class="list-group-item"><h5 class="card-title text-info d-inline">Tittle: </h5>${movie.Title}</li>
                                  <li class="list-group-item"><p class="card-text text-info d-inline">Year: </p>${movie.Year}</li>
                                  <li class="list-group-item"><p class="card-text text-info d-inline">Type: </p>${movie.Type}</li>
                                  <li class="list-group-item"><p class="card-text text-info d-inline">ID imdb: </p>${movie.imdbID}</li>
                                  <li class="list-group-item"><a onclick="selectMovie('${movie.imdbID}')" href="#">Más info</a></li>
                              </ul>
                          </div>
                      </div>
                            `;
                    });
                    $("#movielist").hide();
                    $("#movielist").html(output);
                    $("#movielist").fadeIn("slow");
                }

        })
        .fail(function(){
                alert("The request to the database has been denied");
        });

}

function selectMovie(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'masinfo.html';
    return false;
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
    let apiURL = `https://www.omdbapi.com/?apikey=13d0831a&i=${movieId}`;
    $.getJSON(apiURL, function (data){
        console.log(data);
        let output = ``;
            if(data.Poster !== "N/A" ){
                image = data.Poster
            }
            else{
                image = "imgs/noimage";
            }
            output += `
                 <div class="row mt-4">
                <div class="col-md-4">
                    <img src=${image} class="thumbnail border border-4 border-warning" style="width:300px; height: 450px">
                </div>
                <div class="col-md-8">
                    <h2 class="text-warning bg-dark text-center">${data.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item clase123"> Genre: ${data.Genre} </li>
                        <li class="list-group-item"> Released: ${data.Released} </li>
                        <li class="list-group-item"> Rated: ${data.Rated} </li>
                        <li class="list-group-item"> Imdb Rating: ${data.imdbRating} </li>
                        <li class="list-group-item"> Director: ${data.Director} </li>
                        <li class="list-group-item"> Writer: ${data.Writer} </li>
                        <li class="list-group-item"> Actors: ${data.Actors} </li>
                    </ul>
                    <button onclick="window.location.href='index.html'" class="btn btn-success my-2 w-100">Back to films list</button>
                </div>
            </div>
                        `;
        $("#movie").hide();
        $("#movie").html(output);
        $("#movie").fadeIn("slow");
    });



}