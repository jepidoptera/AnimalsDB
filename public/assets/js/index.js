$(document).ready(function() {
    // add listeners for conserve and exploit buttons.
    // reload page after requests are processed.
    $(".conserveButton").on("click", function(){
        console.log("conserve: " + $(this).data('name'));
        $.post("/api/conserve/" + $(this).data('id')).then(function() {
            console.log("request processed");
            location.reload();
        });
    });
    $(".exploitButton").on("click", function(){
        console.log("exploit: " + $(this).data('name'));
        $.post("/api/exploit/" + $(this).data('id')).then(function() {
            console.log("request processed");
            location.reload();
        });
    });
});