// Sidebar Toggle Script

$("#sidebar-toggle").click(function(e) {
	e.preventDefault();
	$(".wrapper").toggleClass("toggled");
	$(".navbar-fixed-top").toggleClass("toggled");
});
