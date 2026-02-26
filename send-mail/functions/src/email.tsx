import {Body, Container, Head, Heading, Html, Row, Column, Preview, Section, Text, Hr, pixelBasedPreset, Tailwind, Link} from "@react-email/components";
import React from "react";

interface ContactFormProps {
    name: string;
    email: string;
    phoneNumber: string;
    message: string;
}

/**
 * Email react template.
 *
 * @param {Object} props - The contact form properties.
 * @param {string} props.name - The name of the person submitting the form.
 * @param {string} props.email - The email address of the person.
 * @param {string} props.phoneNumber - The phone number of the person.
 * @param {string} props.message - The message submitted in the contact form.
 * @return {void} Nothing is returned.
 */
export default function Email({ name, email, phoneNumber, message }: ContactFormProps): React.JSX.Element {
    return (
        <Html>
            <Head />
            <Preview>Nouvelle soumission de {name} à partir du formulaire de contact</Preview>
            <Tailwind config={{presets: [pixelBasedPreset]}}>
                <Body className="bg-gray-100 font-sans p-8 rounded">
                    <Container className="bg-white mx-auto p-4 rounded-lg shadow-md max-w-xl">
                        {/* Heading */}
                        <Heading className="text-xl font-bold text-gray-800 mb-6 text-center">
                            Nouvelle soumission de {name} à partir du formulaire de contact
                        </Heading>

                        <Hr className="border-green-300 border-2 my-6"/>

                        {/* Contact Details */}
                        <Section>
                            <Row>
                                <Column>
                                    <Text className="text-gray-900 text-base mb-4">
                                        <b>Non Complet: </b> {name}
                                    </Text>
                                    <Text className="text-gray-900 text-base mb-4">
                                        <b>Email: </b> {email}
                                    </Text>
                                    <Text className="text-gray-900 text-base mb-4">
                                        <b>Numero de téléphone: </b> {phoneNumber}
                                    </Text>
                                    <Text className="text-gray-900 text-base mb-4 whitespace-pre-line">
                                        <b>Message: </b> {message}
                                    </Text>
                                </Column>
                            </Row>
                        </Section>

                        <Hr className="border-green-300 border-2 my-6"/>

                        {/* Footer */}
                        <Text className="text-xs text-gray-400 text-center">
                            Ce message a été envoyé depuis le formulaire de contact de votre site web {" "}
                            <span>
                                <Link href="https://arboml.ca/">
                                    arboml.ca
                                </Link>
                            </span>
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
