$( document ).ready(function() {

  var obj = $('.spot')
  var container = $('#grid').offset();
  var previous_position_x;
  var previous_position_y;

  $(obj).each(function() {
      var x =  parseInt($(this).attr('x-position'));
      var y =  parseInt($(this).attr('y-position'));

      $(this).css({
        'left': x - container.left + "px",
        'top' : y - container.top + "px"
      });
  });

	$('#grid').on('mouseover', '.spot', function(){ 
		var $this = $(this);
		$(this).draggable({
			containment: "parent",
			start: function() {
				  var old_position = $(this).offset();
			      previous_position_x = old_position.left + container.left - 4;
			      previous_position_y = old_position.top + container.top - 4;
			},
			stop: function(){
				var $form = $(this).find('form');
			    var offset = $(this).offset();
			    var pos_x = offset.left + container.left - 4;
			    var pos_y = offset.top + container.top - 4;

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
					        'left': previous_position_x + "px",
					        'top' : previous_position_y + "px"
					      }, 400, function() {
					      	alert("You can't do that, space is occupied");
					      });
		            }, 
				});
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
                alert("You can't do that, space is occupied");
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

