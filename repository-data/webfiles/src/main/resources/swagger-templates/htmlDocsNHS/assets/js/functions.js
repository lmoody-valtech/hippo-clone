$( document ).ready(function() {
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
    });

    var textFile = null;

    /// Function to be used to download a text json schema
    function makeTextFile(text) {

        var data = new Blob([text], {type: 'text/plain'});

        // If we are replacing a previously generated file we need to
        // manually revoke the object URL to avoid memory leaks.
        if (textFile !== null) {
            window.URL.revokeObjectURL(textFile);
        }

        textFile = window.URL.createObjectURL(data);

        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = textFile;
        a.download = 'schema.txt';
        a.click();

        return textFile;
    };

    /// TODO: Implement resizing for expanding within iframe
    function callResize() {
        window.parent.postMessage('resize', "*");
    }

    function processMarked() {
        $(".marked").each(function() {
            $(this).html(marked($(this).html()));
        });
    }

    // Bootstrap Scrollspy
    $(this).scrollspy({ target: '#scrollingNav', offset: 18 });

    // Content-Scroll on Navigation click.
    $('.sidenav').find('a').on('click', function(e) {
        e.preventDefault();
        var id = $(this).attr('href');
        if ($(id).length > 0)
            $('html,body').animate({ scrollTop: parseInt($(id).offset().top) }, 400);
        window.location.hash = $(this).attr('href');
    });

    // Quickjump on Pageload to hash position.
    if(window.location.hash) {
        var id = window.location.hash;
        if ($(id).length > 0)
            $('html,body').animate({ scrollTop: parseInt($(id).offset().top) }, 0);
    }


    function initDynamic() {
        // tabs
        $('.nav-tabs-examples a').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        });


        $('.nav-tabs-examples').find('a:first').tab('show');

        // call scrollspy refresh method
        $(window).scrollspy('refresh');
    }

    initDynamic();

    // Pre- / Code-Format
    prettyPrint();

    //Convert elements with "marked" class to markdown
    processMarked();
});