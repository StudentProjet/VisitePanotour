/* Init Panotour */
embedpano({
    swf:"Test Visitedata/Test Visite.swf",
    target:"panoDIV",
    passQueryParameters:true
});

$( document ).ready(function() {

    // transition home -> content
    $("#go").bind("click", function(){
        $("#home").fadeOut("slow");
        $("#content").fadeIn("slow");
        $("#popinCommencer").modal("show");
    });

    $("a[data-href='accueil']").bind("click", function(){
        $('#home').fadeIn("slow");
        $('#content').fadeOut("slow");
    });

});

function test(){
    alert('ok');
}