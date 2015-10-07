moment.locale('es'); 

window.hinchas = window.hinchas || {};
window.hinchas.controller = {

    votados:[],
    clubesDisponibles: [],
    load: function(){

        var ready = function(error, clubes){
            window.hinchas.controller.clubesDisponibles = clubes;
            window.hinchas.controller.socket = io();
            
            window.hinchas.controller.socket.on('newClubs', function(c){
                window.hinchas.controller.votados = c;
                window.hinchas.cloud.reload(window.hinchas.controller.votados );
                $('.tiempo').html(moment(new Date()).fromNow());
            });
            window.hinchas.cloud.load(window.hinchas.controller.votados );
        };

        queue()
            .defer(d3.csv, "data/clubes.csv")
            .await(ready);
    },
    sendClub: function(c){
        window.hinchas.controller.socket.emit('club', c);
    }
};

$(document).ready(function(){
    new WOW().init();
    window.hinchas.controller.load();
});