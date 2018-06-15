var savedData = localStorage.getItem("votes");
var answerCounter = savedData ? JSON.parse(savedData) : {};
const questions = ["País de Residencia", "Lenguaje de programación favorito", "Sistema operativo favorito", "Se dedica profesionalmente a la programación?", "Cómo aprendió a programar?"]

// Load countries
$(document).ready(function() {
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/json"
  }).done(response => {
    let countries = response.paises;
    $.each(countries, (index, item) => {
      let option =  `<option value=${item.codigo}>${item.nombre}</option>`
      $('#countries').append(option);
    });
  });
});

// Function add vote
function addVote(question, answer) {
  answerCounter[question] = answerCounter[question] || {};
  answerCounter[question][answer] = getVote(question, answer) + 1;
  localStorage.setItem("votes", JSON.stringify(answerCounter));
};

// Get votes
function getVote(question, answer) {
  return answerCounter[question][answer] || 0; // When the first value is undefined return the second value
};

// Submit
$('form').on('submit', function(event) {
  $("#label-obligatorio").html("")
  event.preventDefault();
  let country = $('#countries').val();
  let language = $('input[name = "language"]:checked').val();
  let system = $('input[name = "system"]:checked').val();
  let work = $('input[name = "work"]:checked').val();
  let learn = $('input[name = "learn"]:checked').val();
  if (country && language && system && work && learn) {
    addVote("country", country)
    addVote("language", language);
    addVote("system", system);
    addVote("work", work);
    addVote("learn", learn);
    let index=1;
    $.each(answerCounter, function(key, value) {
      let array = [];
      let arrayKey=[];
      $.each(value, function(i, val) {
        array.push(val);
        arrayKey.push(i)
      });
      loadChart(array, arrayKey,index);
      index++;
    });
    $("form").trigger('reset')
  }
  else{
    $("#label-obligatorio").html("Debe completar todos los campos.")
  };  
});

// Graphics
function loadChart(data, labels, index){
  $(".container-chart"+index).empty();
  let canvas=`<canvas id="myChart${index}"></canvas>`
  $(".container-chart"+index).append(canvas);
  var ctx = $('.container-chart'+index+' #myChart'+index);
  var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: labels,
          datasets: [{
              label: '# of Votes',
              data: data,
              backgroundColor: [
                  '#E55029',
                  '#E5AE29',
                  '#BEE529',
                  '#60E529',
                  '#29E550',
                  '#29E5AE'
              ],
          }]
      },
      options: {
        legend: {
          display: true,
          position: 'left',
          labels: {
            fontColor: '#333333'
          }
        },
        title: {
          display: true,
          fontSize: 14,
          text: questions[index - 1]
        },
        scales: {
          yAxes: [{
              display: false,
          }]
        }
      }
  });
}
