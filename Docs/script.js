document.getElementById('bar').addEventListener('click', function() {
        toggleSidebar();
    });

    function toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const computedStyle = window.getComputedStyle(sidebar);

        if (computedStyle.display === 'none' || computedStyle.display === '') {
            sidebar.style.display = 'block';
        } else {
            sidebar.style.display = 'none';
        }
    }

    window.addEventListener('resize', function() {
        const windowWidth = window.innerWidth;

        if (windowWidth > 768) {
            // Reset the sidebar display style for larger screens
            const sidebar = document.getElementById('sidebar');
            sidebar.style.display = 'block';
        }
    });

    document.body.addEventListener('click', function(event) {
        const sidebar = document.getElementById('sidebar');
        const barIcon = document.getElementById('bar');

        if (!sidebar.contains(event.target) && event.target !== barIcon) {
            sidebar.style.display = 'none';
        }
    });