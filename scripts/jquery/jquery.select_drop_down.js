        function createSelectDropDown(elementID){
            var source = $("#"+elementID);
			source.css('display', 'none');
			var target_name = '#'+elementID+'_target';
            var selected = source.find("option[selected]");
            var options = $("option", source);
			if(source.hasClass('select-err')) selectClass = ' select-err'; else selectClass = '';
            source.after('<dl id="'+elementID+'_target" class="select-dropdown'+selectClass+'"></dl>')
            $(target_name).append('<dt><a href="#">' + selected.text() + 
                '<span class="value">' + selected.val() + 
                '</span></a></dt>')
            $(target_name).append('<dd><ul></ul></dd>')

            options.each(function(){
                $(target_name +' dd ul').append('<li><a href="#">' + 
                    $(this).text() + '<span class="value">' + 
                    $(this).val() + '</span></a></li>');
            });
			
			$(target_name + ' dt a').click(function() {
				closeSelectDropDowns();
                $(target_name + ' dd ul').toggle();
				return false;
            });

            $(target_name + ' dd ul li a').click(function() {
                var text = $(this).html();
                $(target_name + " dt a").html(text);
                $(target_name + " dd ul").hide();
                source.val($(this).find("span.value").html())
				return false;
            });					
        }
		
		function closeSelectDropDowns() {

			if($('.select-dropdown dd ul')) {
				$.each	(
					$('.select-dropdown dd ul'),
					function() {
						$(this).hide();
					}
				);
			}		
		
		}
		
		function hideUnusedSelectDropDowns() {
			$(document).bind('click', function(e) {
                var $clicked = $(e.target);
                if (! $clicked.parents().hasClass("select-dropdown"))
                    $(".select-dropdown dd ul").hide();
            });		
		}