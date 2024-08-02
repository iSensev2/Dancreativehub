document.addEventListener('DOMContentLoaded', function() {
    const Middlescroll = document.getElementById('middle');

    Middlescroll.addEventListener('click', function(event) {
        event.preventDefault();

        window.scrollTo({
            top: document.body.scrollHeight / 2,
            behavior: 'smooth'
        });
    });
});


 // Function to autoplay videos
    function autoplayVideos() {
        // Get the video elements
        var coffeeVideo = document.getElementById('coffeeVideo');
        var restaurantVideo = document.getElementById('restaurantVideo');

        // Check if the video elements exist
        if (coffeeVideo && restaurantVideo) {
            // Autoplay the videos
            coffeeVideo.play();
            restaurantVideo.play();
        }
    }

    // Call the function after the page has loaded
    document.addEventListener('DOMContentLoaded', function () {
        autoplayVideos();
    });