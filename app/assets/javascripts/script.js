$( document ).ready(function() {

  var $obj = $('.spot')
  var container = $('#grid').offset();
  var previous_position_x;
  var previous_position_y;
  var colision = false;
  var spot = {
  	colision: false,
  	lifted: false
  }


  $obj.each(function() {
      var x = $(this).attr('x-position');
      var y = $(this).attr('y-position');

      $(this).css({
        'left': x + "px",
        'top' : y + "px"
      })
  });

	$('#grid').on('mouseover', '.spot', function(){ 
		$(this).draggable({
			containment: "parent",
			start: function() {
			    $(this).addClass('lifted').removeClass('resting');
			      previous_position_x = $(this).offset().left - container.left +4;
			      previous_position_y = $(this).offset().top - container.top +4;
			      spot.colision = false;
			},
	 		drag: function() {
				$('.resting').hover(
				  function () {
				    spot.colision = true;
				  }, 
				  function () {
				    spot.colision = false;
				  }
				);
			},
			stop: function(){
			    var offset = $(this).offset();
			    var pos_x = offset.left - container.left +4;
			    var pos_y = offset.top - container.top +4;
			    $(this).removeClass('lifted');
			    $(this).addClass('resting');
			        if (spot.colision == false) {
				        $(this).find('#pos_x').val(pos_x);
				        $(this).find('#pos_y').val(pos_y);
				        $(this).find('form').submit();
			    	}
			    	else {
			    		colision = false;
					    $(this).animate({
						        left: previous_position_x,
						        top: previous_position_y
					    }, 490, 
					    function() {
					        alert("You can't do that!");
					    });
			    }

			}
		});
	});

    $('#grid').click(function (e) {

        var new_x = e.pageX - container.left -12,
          new_y = e.pageY - container.top -12;
          $('#new_name').val('new_block_'+ Math.floor(Math.random()*10));
          $('#new_x').val(new_x);
          $('#new_y').val(new_y);
          $('#new_spot').submit();
        
    });

});


