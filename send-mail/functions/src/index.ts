/* eslint-disable max-len */
/* eslint-disable-next-line new-cap*/

import { onRequest } from "firebase-functions/v2/https";
import { defineString } from "firebase-functions/params";
import {logger } from "firebase-functions/logger";
import { render } from "@react-email/components";
import Email from "./email";
import nodemailer from "nodemailer";

const senderEmail = defineString("SENDER_EMAIL");
const senderPassword = defineString("SENDER_PASSWORD");
const receiverEmail = defineString("RECEIVER_EMAIL");


// Create transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: senderEmail.value(),
        pass: senderPassword.value(),
    },
});

exports.sendEmail = onRequest(
    {cors: true},
    async (req, res) : Promise<void> => {
        try {
            if (req.method !== "POST") {
                res.status(405).json({ message: "Method Not Allowed" });
                return;
            }

            const { name, email, phoneNumber, message } = req.body ?? {};

            if (!name || !email || !phoneNumber || !message) {
                res.status(400).json({
                    message: "Champ obligatoire manquant: name, email, phoneNumber, or message",
                });
                return;
            }

            const emailHtml = await render(Email({name: name, email: email, phoneNumber: phoneNumber, message: message}));

            await transporter.sendMail({
                from: senderEmail.value(),
                to: receiverEmail.value(),
                subject: `Nouvelle soumission de ${name} à partir du formulaire de contact`,
                html: emailHtml,
            });

            logger.info("Email sent successfully");

            res.status(200).json({
                message: "Message envoyé avec succès.",
            });
            return;
        } catch (error) {
            logger.error("sendEmail error:", error);
            res.status(500).json({
                message: "Erreur inattendue. Veuillez réessayer plus tard.",
            });
            return;
        }
    }
);
