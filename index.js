const express = require('express');
const bodyParser = require('body-parser');
const webPush = require('web-push');
const path = require('path');

const app = express();
const PORT = 3000;

// Configura las claves VAPID
const publicVapidKey = 'BJpsA6o0rouTKIqqox9J_ia7hagT5XQvD9mZcf_8OMMXQb0pzwMIWRecmSF5hjK-zGSAQqvHlB-yqbhVJZNJ3Mk';
const privateVapidKey = 'wb-yzqzfsu06pE7-FwTbAy4Q8M-7Urxd7GQSoEnxn5E';

webPush.setVapidDetails('mailto:paulina.solorzano@gmail.com', publicVapidKey, privateVapidKey);

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Maneja las suscripciones
let subscription;

app.post('/subscribe', (req, res) => {
    subscription = req.body;
    res.status(201).json({});
});

// Enviar notificaciones
app.post('/send-notification', (req, res) => {
    const payload = JSON.stringify({ title: '¡Hola!', body: 'Notificación enviada desde tu PWA.' });
    webPush.sendNotification(subscription, payload)
        .then(() => res.status(200).json({ success: true }))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Inicia el servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
