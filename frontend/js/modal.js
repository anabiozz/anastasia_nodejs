document.addEventListener('click', function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;

    e.preventDefault();

    $(".modal-window").bind('scroll', function() {
       console.log('Event worked');
    });

    $(document).on( 'scroll', '.modal-window', function(){
        console.log('Event Fired');
    });

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
                var scroll;
                $(".modal").scrollTop(0);

                $(".modal").bind('scroll', function() {
                   console.log('Event worked');
                   if($(".modal-window img").hasClass("resize")) {
                    
                   } else {
                     scroll = $(".modal").scrollTop();
                   }
                });


                $(".modal-window img").click(function() {
                    if(TriggerClick==0){
                        $(this).addClass("resize");
                        $(".modal").scrollTop(0);
                        width = document.getElementById(this.id).offsetWidth;
                        height = document.getElementById(this.id).offsetHeight;
                        TriggerClick=1;
                        let item = this;
                        // $(".modal-window img:not(#"+this.id+")").hide();
                        $(".modal-window img:not(#"+item.id+")").css('display','none')
                        $(this).css({height: '100%'}, 500);
                        $(this).css({width: '800px'}, 500);
                    }else{
                        $(this).removeClass("resize");
                        TriggerClick=0;
                        $(this).css({width: width}, 500);
                        $(this).css({height: height}, 500);
                        $(".modal-window img").css('display','flex');
                        console.log(scroll);
                        $(".modal").scrollTop(scroll);
                        // $(".modal-window img").show();
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
