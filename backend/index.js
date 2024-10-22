const express = require('express');
const cors = require('cors');
require('dotenv').config();
const SibApiV3Sdk = require('sib-api-v3-sdk');  // Importamos el SDK de Brevo

const app = express();
const PORT = process.env.PORT || 3001;

// Configurar Brevo (Sendinblue)
const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

// Middleware para permitir solicitudes desde el frontend
app.use(cors());
app.use(express.json());

// Ruta para enviar correos, cambiada a "/api/send-email"
app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transactionalEmailsApi = new SibApiV3Sdk.TransactionalEmailsApi();

    // Enviar correo al destinatario principal
    const sendSmtpEmailToReceiver = {
      to: [{ email: process.env.RECEIVER_EMAIL }],  // Correo destinatario principal
      sender: { email: 'd.medina@rtmlabogados.com.ar', name: 'DAMIAN MEDINA' },  // Remitente verificado
      subject: `Nuevo mensaje de ${name}`,
      textContent: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
    };

    await transactionalEmailsApi.sendTransacEmail(sendSmtpEmailToReceiver);

    // Enviar correo de agradecimiento al remitente
    const sendSmtpEmailToSender = {
      to: [{ email: email }],  // Correo del remitente
      sender: { email: 'd.medina@rtmlabogados.com.ar', name: 'DAMIAN MEDINA' },  // Remitente verificado
      subject: 'Gracias por tu mensaje',
      textContent: `Hola ${name},\n\nGracias por contactarme. He recibido tu mensaje: "${message}". Me pondré en contacto contigo pronto.\n\nSaludos,\nDAMIAN MEDINA`
    };

    await transactionalEmailsApi.sendTransacEmail(sendSmtpEmailToSender);

    // Responder éxito
    res.status(200).send('Correos enviados correctamente.');
  } catch (error) {
    console.error('Error al enviar los correos:', error);
    res.status(500).send('Error al enviar los correos.');
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});