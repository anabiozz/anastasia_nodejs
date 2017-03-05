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
                  $('.modal-window').prepend("<img src=" + data[i] + "></img>")
                }
                document.getElementById(m_ID).classList.add('open');
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
