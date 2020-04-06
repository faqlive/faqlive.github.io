// document
$(document).ready(function(){
    init();
//    console.log(document.getElementsByTagName("aside"));    //  HTML collection     //  JavaScript
 //   console.log($("aside"));                                //  Objeto              //  jQuery
});

function init(){ 
    $("#presentation").css("top","0vh");
    $("#experience").css("top","100vh");
    $("#education").css("top","100vh");
    $("#skills").css("top","100vh");
    $("#certification").css("top","100vh");
    $("#interests").css("top","100vh");

    $(".presentation").click(function(){showPres()});
    $(".experience").click(function(){showExpe()});
    $(".education").click(function(){showEduc()});
    $(".skills").click(function(){showSkills()});
    $(".interests").click(function(){showAwards()});
    $(".certification").click(function(){showInters()});
    console.log("SE ha cargado correctamente.");
};

function showPres(){
    $("#presentation").css("top","0vh");
    $("#experience").css("top","100vh");
    $("#education").css("top","100vh");
    $("#skills").css("top","100vh");
    $("#interests").css("top","100vh");
    $("#certification").css("top","100vh");
}
function showExpe(){
    $("#presentation").css("top","100vh");
    $("#experience").css("top","0vh");
    $("#education").css("top","100vh");
    $("#skills").css("top","100vh");
    $("#interests").css("top","100vh");
    $("#certification").css("top","100vh");
}
function showEduc(){
    $("#presentation").css("top","100vh");
    $("#experience").css("top","100vh");
    $("#education").css("top","0vh");
    $("#skills").css("top","100vh");
    $("#interests").css("top","100vh");
    $("#certification").css("top","100vh");
}
function showSkills(){
    $("#presentation").css("top","100vh");
    $("#experience").css("top","100vh");
    $("#education").css("top","100vh");
    $("#skills").css("top","0vh");
    $("#interests").css("top","100vh");
    $("#certification").css("top","100vh");
}
function showAwards(){
    $("#presentation").css("top","100vh");
    $("#experience").css("top","100vh");
    $("#education").css("top","100vh");
    $("#skills").css("top","100vh");
    $("#interests").css("top","0vh");
    $("#certification").css("top","100vh");
}
function showInters(){
    $("#presentation").css("top","100vh");
    $("#experience").css("top","100vh");
    $("#education").css("top","100vh");
    $("#skills").css("top","100vh");
    $("#interests").css("top","100vh");
    $("#certification").css("top","0vh");
}