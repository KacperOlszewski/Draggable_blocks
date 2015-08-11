$( document ).ready(function() {

  var obj = $('.spot')
  var container = $('#grid').offset();
  var previous_position_x;
  var previous_position_y;
  var colision;

  $(obj).each(function() {
      var x =  parseInt($(this).attr('x-position'));
      var y =  parseInt($(this).attr('y-position'));

      $(this).css({
        'left': x - container.left + "px",
        'top' : y - container.top + "px"
      })
  });

	$('#grid').on('mouseover', '.spot', function(){ 
		$(this).draggable({
			containment: "parent",
			start: function() {
			    $(this).addClass('lifted').removeClass('resting');
			      previous_position_x = $(this).attr('x-position');
			      previous_position_y = $(this).attr('y-position');
			},
			stop: function(){
			    var offset = $(this).offset();
			    var pos_x = offset.left + container.left - 4;
			    var pos_y = offset.top + container.top - 4;
			    $(this).removeClass('lifted');
			    $(this).addClass('resting');

				        $(this).find('#pos_x').val(pos_x);
				        $(this).find('#pos_y').val(pos_y);
				        $(this).find('form').submit();


			}
		});
	});

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
                alert("You can't do that!");
            }, 
		});
	});


  document.oncontextmenu = function() {return false;};

  $('.spot').on('mousedown', function(e){ 
    e.preventDefault();
    if( e.button == 2 ) { 
      $(this).find('.destroy').trigger('click');
      $(this).hide(300).remove();
      return false; 
    } 
    return false; 
  }); 

});

