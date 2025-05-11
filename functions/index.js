/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

/* Função Pagamento */
// functions/index.js

const {onRequest} = require("firebase-functions/v2/https");

const {QrCodePix} = require("qrcode-pix");

exports.gerarPix = onRequest(async (req, res) => {
  try {
    const {key, name, city, transactionId, message, value} = req.body;

    // eslint-disable-next-line new-cap
    const qrCode = QrCodePix({
      version: "01",
      key: key,
      name: name,
      city: city,
      transactionId: transactionId,
      message: message,
      value: value,
    });

    const base64 = await qrCode.base64();

    res.json({
      payload: qrCode.payload(),
      base64,
    });
  } catch (err) {
    console.error("Erro ao gerar QR Pix:", err);
    res.status(500).json({error: err.message});
  }
});
