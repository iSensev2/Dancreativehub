document.addEventListener('DOMContentLoaded', function() {
    // Get the middle scroll element
    const Middlescroll = document.getElementById('middle');

    // Add event listener to the middle scroll element
    Middlescroll.addEventListener('click', function(event) {
        event.preventDefault();

        // Scroll to the middle of the page
        window.scrollTo({
            top: document.body.scrollHeight / 2,
            behavior: 'smooth'
        });
    });

    // Function to autoplay videos
    function autoplayVideos() {
        // Get the video elements
        const coffeeVideo = document.getElementById('coffeeVideo');
        const restaurantVideo = document.getElementById('restaurantVideo');

        // Check if the video elements exist
        if (coffeeVideo && restaurantVideo) {
            // Autoplay the videos
            coffeeVideo.play();
            restaurantVideo.play();
        }
    }



});    autoplayVideos();n    // Autoplay videos when the page has loaded