$( document ).ready(function() {

  var obj = $('.spot')
  var container = $('#grid').offset();
  var previous_position_x;
  var previous_position_y;
  var colision;

  $(obj).each(function() {
      var x =  parseInt($(this).attr('x-position')) - container.left;
      var y =  parseInt($(this).attr('y-position')) - container.top;

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
			      previous_position_x = $(this).attr('x-position');
			      previous_position_y = $(this).attr('y-position');
			},
			stop: function(){
			    var offset = $(this).offset();
			    var pos_x = offset.left - container.left;
			    var pos_y = offset.top - container.top;
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
          $('#new_name').val('new_block_'+ Math.floor(Math.random()*10));
          $('#new_x').val(new_x);
          $('#new_y').val(new_y);
          $('#new_spot').submit();
        
    });

  document.oncontextmenu = function() {return false;};

  $('.spot').on('mousedown', function(e){ 
    if( e.button == 2 ) { 
      $(this).find('.destroy').trigger('click');
      $(this).hide(300).remove();
      return false; 
    } 
    e.preventDefault();
    return true; 
  }); 

});


