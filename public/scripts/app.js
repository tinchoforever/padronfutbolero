var colors = d3.scale.category20c();

function googleColors(n) {
  var colores_g = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
  return colores_g[n % colores_g.length];
}
$(document).ready(function(){
    new WOW().init();
    window.hinchas.controller.load();
    
});


window.hinchas = window.hinchas || {};
window.hinchas.controller = {

    load: function(){
        
        var ready = function(error, clubes){
            window.hinchas.cloud.load(filterProjects);
        };
        queue()
            .defer(d3.csv, "data/clubes.csv")
            .await(ready);
    }
};