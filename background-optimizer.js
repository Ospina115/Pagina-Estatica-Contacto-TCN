// Optimización de carga de imágenes de fondo
(function() {
    'use strict';
    
    // Función para precargar imágenes
    function preloadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(url);
            img.onerror = reject;
            img.src = url;
        });
    }
    
    // Detectar tipo de dispositivo y cargar imagen apropiada
    function loadOptimizedBackground() {
        const isMobile = window.matchMedia('(max-width: 767px)').matches;
        const imageUrl = isMobile ? 'images/backgroundmovile.jpg' : 'images/backgroundlaptop.jpg';
        
        // Precargar la imagen antes de aplicarla
        preloadImage(imageUrl)
            .then(() => {
                document.body.style.backgroundImage = `
                    linear-gradient(rgba(0, 0, 0, ${isMobile ? '0.4' : '0.3'}), rgba(0, 0, 0, ${isMobile ? '0.4' : '0.3'})),
                    url('${imageUrl}')
                `;
                document.body.classList.add('background-loaded');
            })
            .catch(() => {
                // Fallback en caso de error
                console.warn('No se pudo cargar la imagen de fondo, usando gradiente por defecto');
                document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            });
    }
    
    // Optimización para cambio de orientación
    function handleOrientationChange() {
        setTimeout(loadOptimizedBackground, 100);
    }
    
    // Cargar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadOptimizedBackground);
    } else {
        loadOptimizedBackground();
    }
    
    // Recargar en cambio de orientación
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // Recargar en cambio de tamaño de ventana (para responsive)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(loadOptimizedBackground, 250);
    });
    
})();
