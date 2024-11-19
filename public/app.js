const publicVapidKey = 'BJpsA6o0rouTKIqqox9J_ia7hagT5XQvD9mZcf_8OMMXQb0pzwMIWRecmSF5hjK-zGSAQqvHlB-yqbhVJZNJ3Mk';

// Registro del Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('Service Worker registrado'));
}

// Función para suscribirse
document.getElementById('subscribe').addEventListener('click', async () => {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });

    // Enviar la suscripción al servidor
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: { 'Content-Type': 'application/json' },
    });

    alert('Suscripción activada');
});

// Enviar notificación
document.getElementById('send').addEventListener('click', async () => {
    await fetch('/send-notification', { method: 'POST' });
    alert('Notificación enviada');
});

// Helper para convertir la clave VAPID
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}
