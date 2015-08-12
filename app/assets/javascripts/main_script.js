$( document ).ready(function() {

  var obj = $('.spot')
  var container = $('#grid').offset();
  var previous_position_x;
  var previous_position_y;

  // INITIALIZE SPOTS
  $(obj).each(function() {
      var x =  parseInt($(this).attr('x-position'));
      var y =  parseInt($(this).attr('y-position'));

      $(this).css({
        'left': x - container.left + "px",
        'top' : y - container.top + "px"
      });
  });

  // UPDATE SPOT
	$('#grid').on('mouseover', '.spot', function(){ 
		var $this = $(this);
		$(this).draggable({
			containment: "parent",
			start: function() {
				  var old_position = $(this).offset();
				  $(this).addClass('lifted');
			      previous_position_x = old_position.left;
			      previous_position_y = old_position.top;
			},
			stop: function(){
				var $form = $(this).find('form.update');
			    var offset = $(this).offset();
			    var pos_x = offset.left + container.left - 4;
			    var pos_y = offset.top + container.top - 4;

			    $(this).removeClass('lifted');
				$(this).find('#pos_x').val(pos_x);
				$(this).find('#pos_y').val(pos_y);

				$form.ajaxSubmit({
					url: $form.attr('action')+".js", 
					type: $form.attr('method'),
			  		success: function () {
		                console.log('udało się!');
		            }, 
			  		error: function () {
		                $this.animate({
					        'left': previous_position_x - container.left + "px",
					        'top' : previous_position_y - container.top + "px"
					      }, 360, function() {
					      	alert("You can't do that, space is occupied");
					      });
		            }, 
				});
			}
		});
	});

	// CREATE SPOT
    $('#grid').click(function (e) {

        var new_x = e.pageX - container.left,
        new_y = e.pageY - container.top;
        var name_block = ('new_block_'+ Math.floor(Math.random()*10));

    	$.ajax({
	  		method: "POST",
	  		url: "/spots.js",
	  		data: { spot: {position_x: new_x, position_y: new_y, name: name_block} },
	  		success: function (data) {
                console.log('udało się');
            }, 
	  		error: function (data) {
                alert("You can't do that, space is occupied");
            }, 
		});
	});

    // DELETE SPOT - Mouseover + "d"
	obj.hover(function(){
	   $(this).toggleClass('removeable');
	});
	$(document).on('keypress', function(e) {    
	    if(e.which == 100){

	      $('.removeable').find('.destroy').submit();
	      $('.removeable').remove();
	    }
	});
});

