/* Init Panotour */
embedpano({
    swf:"visite-finaledata/visite-finale.swf",
    target:"panoDIV",
    passQueryParameters:true
});

$( document ).ready(function() {

    $('#endWin').click(afficherIntersticielFin);
    $('#endLost').click(afficherIntersticielFin);

    $('#finalStep').click(afficherIntersticielFinPass3);

    $("#continuePassage3").on('click', function(){
        localStorage.removeItem("ecathedrale-enigme");
        localStorage.removeItem("ecathedrale-etat");
        localStorage.removeItem("ecathedrale-indice");
        localStorage.setItem('ecathedrale-passage3', '1');
        location.reload(true);
    });

    $(".restartWin").on('click', function(){
        localStorage.removeItem("ecathedrale-enigme");
        localStorage.removeItem("ecathedrale-etat");
        localStorage.removeItem("ecathedrale-indice");
        localStorage.setItem('ecathedrale-passage3', '0');
        location.reload(true);
    });

    $("#restartLost").on('click', function(){
        localStorage.removeItem("ecathedrale-enigme");
        localStorage.removeItem("ecathedrale-etat");
        localStorage.removeItem("ecathedrale-indice");
        location.reload(true);
    });

    if(localStorage.getItem("ecathedrale-enigme") !== null && localStorage.getItem("ecathedrale-etat") !== null){
        cacherIntersticielDebut();

        if(localStorage.getItem("ecathedrale-info-indice") == "1"){
            localStorage.setItem('ecathedrale-info-indice', '0');
            $("#indice-img").attr("src","assets/imgs/btn_points_1.png");
        }

        if(localStorage.getItem("ecathedrale-etat") == "endFail" || localStorage.getItem("ecathedrale-etat") == "endWin"){
            afficherIntersticielFin();
        }
        else if(localStorage.getItem("ecathedrale-etat") == "chercher"){
            chercherEnigme(localStorage.getItem("ecathedrale-enigme"));
        }else{
            startstep(localStorage.getItem("ecathedrale-enigme"));
        }

        if(localStorage.getItem("ecathedrale-passage3") == "1" && localStorage.getItem("ecathedrale-passage3") !== null){
            $("#indice-img").attr("src","assets/imgs/btn_points_0_bleu.png");
            $("#aide-img").attr("src","assets/imgs/btn_aide_bleu.png");
            $("#enqueteur").attr("src","assets/imgs/enqueteur_normal_bleu.png");
            localStorage.setItem("ecathedrale-passage3", "2");
            chercherEnigme(9);
            $("#popinCommencerPassage3").modal("show");
            $("#enigme1").hide();
            $("#home").fadeOut("slow");
            $("#content").fadeIn("slow");
        }else if (localStorage.getItem("ecathedrale-passage3") == "2" && localStorage.getItem("ecathedrale-passage3") !== null) {
            $("#enigme1").hide();
            $("#home").fadeOut("slow");
            $("#content").fadeIn("slow");
            $("#indice-img").attr("src", "assets/imgs/btn_points_0_bleu.png");
            $("#aide-img").attr("src", "assets/imgs/btn_aide_bleu.png");
            $("#enqueteur").attr("src","assets/imgs/enqueteur_normal_bleu.png");
        }

    }else{

        if(localStorage.getItem("ecathedrale-passage3") == "1" && localStorage.getItem("ecathedrale-passage3") !== null){
            $("#indice-img").attr("src","assets/imgs/btn_points_0_bleu.png");
            $("#aide-img").attr("src","assets/imgs/btn_aide_bleu.png");
            $("#enqueteur").attr("src","assets/imgs/enqueteur_normal_bleu.png");
            localStorage.setItem("ecathedrale-passage3", "2");
            chercherEnigme(9);
            $("#popinCommencerPassage3").modal("show");
            $("#enigme1").hide();
            $("#home").fadeOut("slow");
            $("#content").fadeIn("slow");
        }else if (localStorage.getItem("ecathedrale-passage3") == "2" && localStorage.getItem("ecathedrale-passage3") !== null){
            $("#enigme1").hide();
            $("#home").fadeOut("slow");
            $("#content").fadeIn("slow");
            $("#indice-img").attr("src","assets/imgs/btn_points_0_bleu.png");
            $("#aide-img").attr("src","assets/imgs/btn_aide_bleu.png");
            $("#enqueteur").attr("src","assets/imgs/enqueteur_normal_bleu.png");
        }else{
            chercherEnigme(1);
        }
    }

    if(localStorage.getItem("ecathedrale-indice") !== null){
        writeIndice(localStorage.getItem("ecathedrale-indice"));
    }

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

    $(".change").bind("click", function(){
        $("#enqueteur").attr("src","assets/imgs/enqueteur_normal.png");
        $('#bulle p').html('Je suis la pour <br>t\'aider pendant ta visite.');
    });

    $(".change_pass3").bind("click", function(){
        $("#enqueteur").attr("src","assets/imgs/enqueteur_normal_bleu.png");
        $('#bulle p').html('Je suis la pour <br>t\'aider pendant ta visite.');
    });

    $(".continue").bind("click", function(){
        localStorage.setItem('ecathedrale-info-indice', '1');
        location.reload(true);
    });
});

function startstep(number){
    if(localStorage.getItem("ecathedrale-enigme") == number){
        localStorage.setItem('ecathedrale-etat', 'resoudre');
        $('.barreEnigme').html('<h3>Énigme</h3>');
        $('#enigme'+number+' .enigme_info').addClass('hidden');
        $('#enigme'+number+' .enigme_content').removeClass('hidden');
        switch(number) {
            case '1':
                initGestionEnigme1();
                break;
            case '2':
                initGestionEnigme2();
                break;
            case '3':
                initGestionEnigme3();
                break;
            case '4':
                initGestionEnigme4();
                break;
            case '5':
                initGestionEnigme5();
                break;
            case '6':
                initGestionEnigme6();
                break;
            case '7':
                initGestionEnigme7();
                break;
            case '8':
                initGestionEnigme8();
                break;
            // Passaege 3
            case '9':
                initGestionEnigme9();
                break;
            case '10':
                initGestionEnigme10();
                break;
            case '11':
                initGestionEnigme11();
                break;
            case '12':
                initGestionEnigme12();
                break;
        }
    }
    else if (number == "12"){
        location.reload(true);
    } else {
        console.log('Cette énigme n\'est pas encore accessible à l\'utilisateur ...');
    }
}

function cacherIntersticielDebut(){
    $('#home').css('display','none');
    $('#content').css('display', 'block');
}

function afficherIntersticielFin(){
    if(localStorage.getItem("ecathedrale-etat") == "endWin") {
        $('#endGame').css('display', 'block');
    }else if(localStorage.getItem("ecathedrale-etat") == "endFail"){
        $('#endGameLost').css('display', 'block');
    }
    $('#content').css('display', 'none');
}

function afficherIntersticielFinPass3(){
    if(localStorage.getItem("ecathedrale-etat") == "endWinPass3") {
        $('#endGamePass3').css('display', 'block');
    }
    $('#content').css('display', 'none');
}

function chercherEnigme(number){
    if(parseInt(number) > 1)
        $('.barreEnigme').html('<h3>Pour trouver la prochaine énigme :</h3>');
    localStorage.setItem('ecathedrale-enigme', number);
    localStorage.setItem('ecathedrale-etat', 'chercher');
    $('#enigme'+(number-1)+' .enigme_content').addClass('hidden');
    $('#enigme'+number+' .enigme_info').removeClass('hidden');
}

function writeIndice(indice){
    $('#text-indice').text(indice);
    localStorage.setItem("ecathedrale-indice",indice);
}

/*
 * Enigme 1
 * Objectif : Trouver le nombre d'ange sur une image
 * Réponse : 3 anges
 * */
function initGestionEnigme1() {
    var htmlEnigme = $("#enigme1 .enigme_content");
    var nombreAnge = 3;

    //Écriture de l'énigme <html> dans la div énigme
    htmlEnigme
        .html("<p class='col-md-12'>Pour résoudre cette énigme, dis-nous combien d'anges surplombent le portail <br/>À toi de jouer !</p><div class='col-md-12'><input type='text' placeholder='Réponse' name='reponseNbAnges' /> <button class='checkAnge'>Vérifier</button></div><div class='indication col-md-12'></div>"
    );

    $("#enqueteur").attr("src","assets/imgs/enqueteur_reflechit.png");
    $("#bulle p").html('Reflechit bien !');

    //Click sur le bouton Vérifier
    //Vérifie la réponse donnée
    htmlEnigme.on("click", ".checkAnge", function(){
        var reponseUser = $('input[name="reponseNbAnges"]').val();
        if (reponseUser == nombreAnge) {
            $("#enqueteur").attr("src","assets/imgs/enqueteur_expose.png");
            $("#bulle p").html('BRAVO !');
            writeIndice('3');
            $("#modal1").modal("show");
            chercherEnigme(2);
        } else {
            $('#bulle p').html('Ce n\'est pas la<br> bonne réponse. <br>Essaye encore ...');
        }
    });

}

/*
 * Enigme 2
 * Objectif : Faire le mot EVEQUE
 * Réponse : Drag / Drop
 * */
function initGestionEnigme2() {

    $("#enqueteur").attr("src","assets/imgs/enqueteur_reflechit.png");
    $("#bulle p").html('Reflechit bien !');
    letter_cases = $(".square_letter_to_pickup");
    letter_cases.disableSelection();
    letter_cases.children().disableSelection();
    $('.square_letter').disableSelection();


    $(".square_letter").droppable({
        drop: function(event,ui){
            if( $(this).html() == "") {
                // case vide
                ui.draggable.removeAttr("style");
                $(this).html(ui.draggable);
            }else{
                //case non-vide
                if($(this).find("span") != ""){
                    //case contenant un span donc une lettre
                    if($(this).find("span").attr("state") != "locked") {
                        // mais lettre contenue n'est pas la bonne alors échange

                        //Ensemble de places de depart possibles pour les E
                        if($(this).find("span").text()=="E"){
                            if($("[data-letter='E']:eq(0)").html() == ""){
                                $("[data-letter='E']:eq(0)").html($(this).find("span"));
                            }else{
                                if($("[data-letter='E']:eq(1)").html() == ""){
                                    $("[data-letter='E']:eq(1)").html($(this).find("span"));
                                }else{
                                    if($("[data-letter='E']:eq(2)").html() == ""){
                                        $("[data-letter='E']:eq(2)").html($(this).find("span"));
                                    }
                                }
                            }
                        }else{
                            //Operation pour toute lettre differente du "E"
                            $("[data-letter='" + $(this).find("span").text() + "']").html($(this).find("span"));
                        }
                        //Mise en place de la lettre dans sa nouvelle case
                        $(this).html(ui.draggable);
                    }
                }
                //Permet que la lettre apparaisse a l'interieur de la case de destination
                ui.draggable.removeAttr("style");
            }
        }
    });

    letter_cases.children().draggable({
        stop:function(){
            $count=0;

            /*********************************/
            /*    VERIFICATION LETTRES    */
            /*********************************/

            if($(".square_letter:eq(0)").text() == "E"){
                $(".square_letter:eq(0)").css("background","#00BB00");
                $(".square_letter:eq(0) > span").draggable("disable");
                $(".square_letter:eq(0) > span").attr("state","locked");
                $count++;
            }

            if($(".square_letter:eq(1)").text() == "V"){
                $(".square_letter:eq(1)").css("background","#00BB00");
                $(".square_letter:eq(1) > span").draggable("disable");
                $(".square_letter:eq(1) > span").attr("state","locked");
                $count++;
            }

            if($(".square_letter:eq(2)").text() == "E"){
                $(".square_letter:eq(2)").css("background","#00BB00");
                $(".square_letter:eq(2) > span").draggable("disable");
                $(".square_letter:eq(2) > span").attr("state","locked");
                $count++;
            }

            if($(".square_letter:eq(3)").text() == "Q"){
                $(".square_letter:eq(3)").css("background","#00BB00");
                $(".square_letter:eq(3) > span").draggable("disable");
                $(".square_letter:eq(3) > span").attr("state","locked");
                $count++;
            }

            if($(".square_letter:eq(4)").text() == "U"){
                $(".square_letter:eq(4)").css("background","#00BB00");
                $(".square_letter:eq(4) > span").draggable("disable");
                $(".square_letter:eq(4) > span").attr("state","locked");
                $count++;
            }

            if($(".square_letter:eq(5)").text() == "E") {
                $(".square_letter:eq(5)").css("background", "#00BB00");
                $(".square_letter:eq(5) > span").draggable("disable");
                $(".square_letter:eq(5) > span").attr("state","locked");
                $count++;
            }

            if($count == 6){
                chercherEnigme(3);
                writeIndice('3, évêque');
                $("#enqueteur").attr("src","assets/imgs/enqueteur_expose.png");
                $("#bulle p").html('BRAVO !');
                $("#indice-img").attr("src","assets/imgs/btn_points_2.png");
                $("#modal2").modal("show");
            }
        },
        cursor:'move',
        revert:"invalid"
    });
}

/*
 * Enigme 3
 * Objectif : compte le nombre de personnes au centre, et multiplie-le par deux.
 * Réponse : 4
 * */
function initGestionEnigme3() {
    var htmlEnigme = $("#enigme3 .enigme_content");
    var nombrePers = 8;

    //Écriture de l'énigme <html> dans la div énigme
    htmlEnigme
        .html("<p class='col-md-12'>Pour résoudre cette énigme, compte le nombre de personnes au centre, et multiplie-le par deux. <br/>À toi de jouer !</p><div class='col-md-12'><input type='text' placeholder='Réponse' name='reponseNbPers' /> <button class='checkAnge'>Vérifier</button></div><div class='indication col-md-12'></div>"
    );

    $("#enqueteur").attr("src","assets/imgs/enqueteur_reflechit.png");
    $("#bulle p").html('Reflechit bien !');

    //Click sur le bouton Vérifier
    //Vérifie la réponse donnée
    htmlEnigme.on("click", ".checkAnge", function(){
        var reponseUser = $('input[name="reponseNbPers"]').val();
        if (reponseUser == nombrePers) {
            $("#enqueteur").attr("src","assets/imgs/enqueteur_expose.png");
            $('#bulle p').html('BRAVO !');
            $("#indice-img").attr("src","assets/imgs/btn_points_3.png");
            writeIndice('3, évèque, H');
            $("#modal3").modal("show");
            chercherEnigme(4);
        } else {
            $('#bulle p').html('Ce n\'est pas la<br> bonne réponse. <br>Essaye encore ...');
        }
    });

}

/*
 * Enigme 4 partie 1
 * Objectif : Trouver les R dans les B
 * */
function initGestionEnigme4(){
    var nbr=11;
    $("#enigme4 .enigme_content").html("<p class='col-md-12'>Pour résoudre cette énigme, clique sur tous les R qui se cachent parmis les B.</p><p class='col-md-12'>A toi de jouer !</p><div class='col-md-12 col-xs-12 col-sm-12'><table class='GrilleEnigme2 col-md-8 col-md-offset-2  col-xs-8 col-xs-offset-2  col-sm-8 col-sm-offset-2'><tr><td>B</td><td>B</td><td>B</td><td>B</td><td>B</td><td>B</td></tr><tr><td>B</td><td>B</td><td>R</td><td>R</td><td>B</td><td>B</td></tr><tr><td>B</td><td>R</td><td>B</td><td>B</td><td>R</td><td>B</td></tr><tr><td>B</td><td>B</td><td>B</td><td>B</td><td>R</td><td>B</td></tr><tr><td>B</td><td>B</td><td>B</td><td>R</td><td>B</td><td>B</td></tr><tr><td>B</td><td>B</td><td>B</td><td>B</td><td>R</td><td>B</td></tr><tr><td>B</td><td>R</td><td>B</td><td>B</td><td>R</td><td>B</td></tr><tr><td>B</td><td>B</td><td>R</td><td>R</td><td>B</td><td>B</td></tr><tr><td>B</td><td>B</td><td>B</td><td>B</td><td>B</td><td>B</td></tr> </table></div>");
    $("#enqueteur").attr("src","assets/imgs/enqueteur_reflechit.png");
    $('#bulle p').html('Il reste 11 R à trouver.');

    $(".enigmes .GrilleEnigme2 td").on('click',function(){

        var lettre=$(this).text();
        var css=$(this).css('background-color');

        if ((lettre =='R') && (css!='rgb(255, 0, 0)')){
            nbr--;
            $('#bulle p').html('Il reste '+nbr+' R à trouver.');

            $(this).css({
                "background":"red",
                "border":"1px solid black",
                "color": "white"
            });

            if(nbr==0){
                $("#enqueteur").attr("src","assets/imgs/enqueteur_expose.png");
                $('#bulle p').html('BRAVO !');
                $("#modal4").modal("show");
                $("#indice-img").attr("src","assets/imgs/btn_points_3.png");
                chercherEnigme(5);
                writeIndice('3 + 3, évèque, H');
            }
        }

    });
}

/*
 * Enigme 5
 * Objectif : Résoudre un rébus
 * Réponse : boulanger
 */
function initGestionEnigme5(){
    var response='boulanger';

    $("#enigme5 .enigme_content")
        .html("" +
        "<p class='col-md-12 col-xs-12 col-sm-12'>Sauras-tu résoudre ce rébus pour trouver le quatrième indice ?</p>" +
        "<p class='col-md-12'>À toi de jouer !</p>" +
        "<div class='col-md-12 col-xs-12 col-sm-12'>"+
        "<img class='col-md-4' src='assets/imgs/boule.png' alt='boule' />"+
        "<img class='col-md-4' src='assets/imgs/ange.png' alt='ange' />"+
        "<img class='col-md-4' src='assets/imgs/&.png' alt='et' />"+
        "</div>"+
        "<div class='inputRebus col-md-12 col-xs-12 col-sm-12'>"+
        "<input type='text' placeholder='Réponse' name='reponseRebus'/><button class='checkRebus'> Vérifier </button></div><div class='indication col-md-12'></div>");

    $("#enqueteur").attr("src","assets/imgs/enqueteur_reflechit.png");
    $('#bulle p').html('Reflechit bien !');

    $(".enigmes").on('click', '.checkRebus', function(){
        var userResponse = $('input[name="reponseRebus"]').val().toLowerCase();

        if (userResponse == response){
            $("#enqueteur").attr("src","assets/imgs/enqueteur_expose.png");
            $('#bulle p').html('BRAVO !');
            $("#modal5").modal("show");
            chercherEnigme(6);
            $("#indice-img").attr("src","assets/imgs/btn_points_4.png");
            writeIndice('3 + 3, évèque, H, Boulanger');
        }
        else{
            $('#bulle p').html('Ce n\'est pas la<br> bonne réponse. <br>Essaye encore ...');
        }
    });

}


/*
 * Enigme 6
 * Objectif : Trouver le mot
 * Réponse : Saint ou Sain
 */
function initGestionEnigme6(){
    var htmlEnigme = $("#enigme6 .enigme_content");
    var reponse1 = 'saint';
    var reponse2 = 'sain';

    htmlEnigme
        .html(
        "<p class='col-md-12 col-xs-12'>Pour résoudre cette énigme, trouve le nom commun à toutes les définitions :</p>" +
        "<p class='col-md-12 col-xs-12'>" +
        "1. Il est parfois synonyme de bonne santé <br/>" +
        "2. Les personnes ayant bon cœur en sont qualifiés <br/>" +
        "3. Valentin et Nicolas sont très connus <br/>" +
        "4. Chaque jour le calendrier en célèbre un différent <br/>" +
        "</p>" +
        "<div class='col-md-12'>" +
        "<input type='text' placeholder='Réponse' name='reponseEnigme6' /> <button class='checkEnigme6'>Vérifier</button>" +
        "</div><div class='indication col-md-12'></div>"
    );

    $("#enqueteur").attr("src","assets/imgs/enqueteur_reflechit.png");
    $('#bulle p').html('Reflechit bien !');

    htmlEnigme.on('click', '.checkEnigme6', function(){
        var userResponse = $('input[name="reponseEnigme6"]').val().toLowerCase();
        if (userResponse == reponse1 || userResponse == reponse2) {
            $("#enqueteur").attr("src","assets/imgs/enqueteur_expose.png");
            $('#bulle p').html('BRAVO !');
            $("#modal6").modal("show");
            chercherEnigme(7);
            $("#indice-img").attr("src","assets/imgs/btn_points_5.png");
            writeIndice('3 + 3, évèque, H, Boulanger, Saint');
        }else{
            $('#bulle p').html('Ce n\'est pas la<br> bonne réponse. <br>Essaye encore ...');
        }
    });
}

function initGestionEnigme7(){
    $("#enqueteur").attr("src","assets/imgs/enqueteur_reflechit.png");
    $('#bulle p').html('Reflechit bien !');
    var correctCards = 0;
    $(".dragIt").disableSelection();

    function handleCardDrop(event, ui ) {
        var slotLetter = $(this).data('letter');
        var cardLetter = ui.draggable.data('letter');

        ui.draggable.position({of: $(this), my: 'left top', at: 'left top'});

        $("#cardPile").find("div").each(function() {
            if($(this).data("letterStock")===slotLetter){
                $(this).css("left", "");
                $(this).css("top", "");
                $(this).removeData("letterStock");
            }
        });

        if (cardLetter !== slotLetter) {
            ui.draggable.data("letterStock", $(this).data('letter'));
        } else {
            ui.draggable.addClass('correctCard');
            ui.draggable.draggable('disable');
            $(this).droppable('disable');
            ui.draggable.draggable('option', 'revert', false);
            correctCards++;
            console.log(correctCards);
            if(correctCards===4){
                $("#indice-img").attr("src","assets/imgs/btn_points_6.png");
                $("#enqueteur").attr("src","assets/imgs/enqueteur_expose.png");
                $('#bulle p').html('BRAVO !');
                $("#modal7").modal("show");
                chercherEnigme(8);
                writeIndice('3 + 3, évèque, H, Boulanger, Saint, Pain');
            }
        }
    }

    $(".recepteur").droppable({
        drop: handleCardDrop
    });

    $(".dragIt").draggable({
        containment: '#dragDropEnigme7',
        cursor: 'move',
        revert:"invalid"
    });
}

function initGestionEnigme8() {
    $("#modal8").modal("show");
    var essaisRestant = 3;
    var bonnesReponses = 0;
    var bonnesLettres = ['A', 'I', 'N', 'T', 'O', 'R', 'É'];

    $("#enqueteur").attr("src","assets/imgs/enqueteur_reflechit.png");
    $('#bulle p').html('Il reste <span id="essaisRestant">'+essaisRestant+'</span> essais');

    bonnesLettres.forEach(function(lettre) {
        $('.'+lettre).text('_');
        $('.letter').show();
    });

    $('.choice_letter .letter').on('click', function(event) {
        var lettreChoisie = event.target.innerText;

        if(bonnesLettres.indexOf(lettreChoisie) > -1){
            $('.pendu .'+lettreChoisie).text(lettreChoisie);
            bonnesReponses++;
            $(event.target).hide();
        }else{
            essaisRestant--;
            $('#bulle p').html('Il reste <span id="essaisRestant">'+essaisRestant+'</span> essais');
        }

        if(essaisRestant === 0){
            derniereChance()
        }

        if(bonnesReponses === 7){
            writeIndice('3 + 3, évèque, H, Boulanger, Saint, Pain');
            $("#enqueteur").attr("src","assets/imgs/enqueteur_expose.png");
            $('#bulle p').html('BRAVO !');
            $("#modal9").modal("show");
            $("#modal9 .modal-body button").addClass("modalGagne");
            localStorage.setItem('ecathedrale-etat', 'endWin');
        }
    });
}

function derniereChance() {
    $("#modal10").modal("show");
    $("#enqueteur").attr("src","assets/imgs/enqueteur_reflechit.png");
    $('#bulle p').html('Reflechit bien !');
    localStorage.setItem('ecathedrale-etat', 'endFail');
    $('.barreEnigme').html("C'est ta dernière chance ...");
    $('#enigme8 .enigme_content').addClass('hidden');
    $('#derniereChance .enigme_content').removeClass('hidden');
    $(".dcLabel").disableSelection();
    $(".dcLabel").click(function(){
        if($(this).hasClass("dcFaux")){
            $(this).removeClass("label-default");
            $(this).addClass("label-danger");
        }
        else if($(this).hasClass("dcVrai")){
            $(this).removeClass("label-default");
            $(this).addClass("label-success");
            $("#modal9").modal("show");
        }
    });
}

// Passage 3 //

function initGestionEnigme9() {
    var response=4;
    $("#enqueteur").attr("src","assets/imgs/enqueteur_reflechit_bleu.png");
    $("#bulle p").html('Reflechit bien !');

    $(".enigmes").on('click', '.checkVierge', function(){
        var userResponse = $('input[name="reponseVierge"]').val().toLowerCase();

        if (userResponse == response){
            $("#enqueteur").attr("src","assets/imgs/enqueteur_expose_bleu.png");
            $('#bulle p').html('BRAVO !');
            $("#modalPass3_1").modal("show");
            chercherEnigme(10);
            $("#indice-img").attr("src","assets/imgs/btn_points_1_bleu.png");
            writeIndice('COPIE');
        }
        else{
            $('#bulle p').html('Ce n\'est pas la<br> bonne réponse. <br>Essaye encore ...');
        }
    });
}

function initGestionEnigme10() {
    var response="jesus christ";
    var response2="jésus christ";
    $("#enqueteur").attr("src","assets/imgs/enqueteur_reflechit_bleu.png");
    $("#bulle p").html('Reflechit bien !');

    $(".enigmes").on('click', '.checkMessage', function(){
        var userResponse = $('input[name="reponseMessage"]').val().toLowerCase();

        if (userResponse == response || userResponse == response2){
            $("#enqueteur").attr("src","assets/imgs/enqueteur_expose_bleu.png");
            $('#bulle p').html('BRAVO !');
            $("#modalPass3_2").modal("show");
            chercherEnigme(11);
            $("#indice-img").attr("src","assets/imgs/btn_points_2_bleu.png");
            writeIndice('COPIE, NORD');
        }
        else{
            $('#bulle p').html('Ce n\'est pas la<br> bonne réponse. <br>Essaye encore ...');
        }
    });
}

function initGestionEnigme11() {
    var response="2";

    $("#enqueteur").attr("src","assets/imgs/enqueteur_reflechit_bleu.png");
    $("#bulle p").html('Reflechit bien !');

    $(".enigmes").on('click', '.checkBoussole', function(){
        var userResponse = $('input[name=optionsRadios]:checked').val();

        if (userResponse == response){
            $("#enqueteur").attr("src","assets/imgs/enqueteur_expose_bleu.png");
            $('#bulle p').html('BRAVO !');
            $("#modalPass3_3").modal("show");
            chercherEnigme(12);
            $("#indice-img").attr("src","assets/imgs/btn_points_2_bleu.png");
            writeIndice('COPIE, SUD-EST');
        }
        else{
            $('#bulle p').html('Ce n\'est pas la<br> bonne réponse. <br>Essaye encore ...');
        }
    });
}

function initGestionEnigme12() {
    var response="1";

    $("#enqueteur").attr("src","assets/imgs/enqueteur_reflechit_bleu.png");
    $("#bulle p").html('Reflechit bien !');

    $(".enigmes").on('click', '.checkFinal', function(){
        var userResponse = $('input[name=optionsRadios2]:checked').val();

        if (userResponse == response){
            $("#enqueteur").attr("src","assets/imgs/enqueteur_expose_bleu.png");
            $('#bulle p').html('BRAVO !');
            $("#modalPass3_final").modal("show");
            $("#enigme12 .enigme_content").addClass("hidden");
            localStorage.setItem('ecathedrale-etat', 'endWinPass3');
        }
        else{
            $('#bulle p').html('Ce n\'est pas la<br> bonne réponse. <br>Essaye encore ...');
        }
    });
}
