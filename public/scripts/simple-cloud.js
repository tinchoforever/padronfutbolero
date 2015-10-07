window.hinchas = window.hinchas || {};

window.hinchas.cloud = {

    baseRoot: [],
    filteredRoot: [],
    reload : function(clubes){


        this.changebubble(clubes);
    },
    processRoot: function(clubes){
            


    },
    load: function(clubes){
    
        this.projects = clubes;
        var root = this.processRoot(clubes);
        this.setupColors(clubes);

        this.reloadGraph(clubes); 


    },
    setupColors: function(clubes){

        window.hinchas.cloud.color = 
            d3.scale.category20()
            .domain(d3.range(clubes.length));        

    },

    getColorFor:function(clube){
        return  window.hinchas.cloud.color(club.id);
    },
    reloadGraph: function(clubes){
        var data = clubes;
        var width = $(window).width()/2;
        barHeight = 40;

       
        var chart = this.svg = d3.select("svg")
              .append("g")
                .attr("width", width)
                .attr("height", width)
                .attr("class", "bubble chart")

        window.hinchas.cloud.x = 
        d3.scale.linear()
            .range([100, width]);

        window.hinchas.cloud.x.domain([0, d3.max(data, function(d) { return d.count; })]);

        window.hinchas.cloud.svg.attr("height", barHeight * data.length);

        window.hinchas.cloud.changebubble(clubes); 

        
    },
    changebubble:function(clubes){
        var width = $(window).width()/2;

        var barHeight = 40;
        var data = clubes;
        
         window.hinchas.cloud.x = d3.scale.linear()
            .range([2, width*5]);

        window.hinchas.cloud.x.domain([0, 
            300]);
        
        
        var bar = 
            window.hinchas.cloud.bar = 
            this.svg.selectAll("g.bar")
              .data(data, function(d,i){
                return i;
              });
        
        bar.attr("transform", function(d, i) 
                    { return "translate(0," + i * barHeight + ")"; });

        bar.enter()
                .append("g")
                .attr('class', 'bar')
                .attr("transform", function(d, i) 
                    { return "translate(0," + i * barHeight + ")"; })
        
        bar.append('rect');
        //         .attr("width", function(d) { return window.hinchas.cloud.x(d.count); })
        //         .attr("height", barHeight - 1);
        
        bar.append('text');
        //           .attr("x", function(d) { return window.hinchas.cloud.x(d.count) - 3; })
        //           .attr("y", barHeight / 2)
        //           .attr("dy", ".35em")
        //           .text(function(d) { return d.key +  " - " + d.count; });
        
        bar.select('rect')
                .transition()
                .duration(1000)
                .attr("width", function(d) { 
                    return window.hinchas.cloud.x(d.count); })
                .attr("height", barHeight - 1);
        bar.select('text')
                .transition()
                .duration(1000)
                  .attr("x", function(d) { 20; })
                  .attr("y", barHeight/2)
                  .attr("dy", ".1em")
                  .text(function(d) { return d.key +  "  " + d.count + " "; });
        
        bar.exit().remove();
    }

};
