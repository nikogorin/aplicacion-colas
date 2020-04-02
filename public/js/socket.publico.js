var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('connect', function() {
    console.log('conectado al servidor :)');
});



socket.on('disconnect', function() {
    console.log('Perdimos conexion con el servidor :(');
});

socket.on('estadoActual', function(data) {
    actualizaHTML(data.ultimos4);
});

socket.on('ultimos4', function(data) {
    actualizaHTML(data.ultimos4);
    var promise = new Audio('audio/new-ticket.mp3').play();
    //audio.play();
    if (promise !== undefined) {
        promise.then(_ => {
            // Autoplay started!
        }).catch(error => {
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
        });
    }
});

function actualizaHTML(ultimos4) {
    for (let index = 0; index < ultimos4.length; index++) {
        lblTickets[index].text('Ticket ' + ultimos4[index].numero);
        lblEscritorios[index].text('Escritorio ' + ultimos4[index].escritorio);
    }
}