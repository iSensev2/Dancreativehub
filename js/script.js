document.getElementById('bar').addEventListener('click', function() {
        toggleSidebar();
    });

    function toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const computedStyle = window.getComputedStyle(sidebar);
























    });        }            sidebar.style.display = 'none';        if (!sidebar.contains(event.target) && event.target !== barIcon) {        const barIcon = document.getElementById('bar');        const sidebar = document.getElementById('sidebar');    document.body.addEventListener('click', function(event) {    });        }            sidebar.style.display = 'block';            const sidebar = document.getElementById('sidebar');            // Reset the sidebar display style for larger screens
n        if (windowWidth > 768) {        const windowWidth = window.innerWidth;    window.addEventListener('resize', function() {    }        }            sidebar.style.display = 'none';        } else {            sidebar.style.display = 'block';n        if (computedStyle.display === 'none' || computedStyle.display === '') {