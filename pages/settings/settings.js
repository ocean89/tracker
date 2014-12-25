$(document).ready(function(){

	$.support.cors = true;

    $("#reset").click(function(){
        StorageManager.reset();
    });

    $("#sync").click(function(){
        StorageManager.sync();
    });
});