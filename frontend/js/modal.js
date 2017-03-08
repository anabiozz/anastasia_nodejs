document.addEventListener('click', function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;

    e.preventDefault();

    if (target.hasAttribute('data-toggle') && target.getAttribute('data-toggle') == 'modal') {
        if (target.hasAttribute('data-target')) {
            var m_ID = target.getAttribute('data-target');
            var dir = target.getAttribute('data-dir');

            var fileextension = ".jpg";
            var query = "/api/images?dir="+dir;

            $.ajax({
              url: query,
              success: function (data) {
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                  $('.modal-window').prepend('<img id="change'+[i]+'" src=\"' + data[i] + '\"></img>')
                }
                document.getElementById(m_ID).classList.add('open');

                var TriggerClick = 0;
                var width;
                var height;

                $(".modal-window img").click(function(){
                  if(TriggerClick==0){
                      width = document.getElementById(this.id).offsetWidth;
                      height = document.getElementById(this.id).offsetHeight;
                      TriggerClick=1;
                      $(".modal-window img:not(#"+this.id+")").css("visibility", "hidden");
                      $(".modal-window img:not(#"+this.id+")").hide();
                      $(this).animate({width: '800px'}, 500);
                      $(this).animate({height: '100%'}, 500);
                  }else{
                       TriggerClick=0;
                       $(this).animate({width: width}, 800);
                       $(this).animate({height: height}, 800);
                       setTimeout(function(){
                         $(".modal-window img").css('visibility','visible');
                         $(".modal-window img").show();
                       }, 1000);
                  };
                });

              }
            });


        }
    }

    // Close modal window with 'data-dismiss' attribute or when the backdrop is clicked
    if ((target.hasAttribute('data-dismiss') && target.getAttribute('data-dismiss') == 'modal') || target.classList.contains('modal')) {
        var modal = document.querySelector('[class="modal open"]');
        $('.modal-window').empty();
        modal.classList.remove('open');
    }
}, false);
