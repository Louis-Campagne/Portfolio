<?php
// ----------------------------------------------------
// 1. CONFIGURATION
// ----------------------------------------------------

// Votre adresse e-mail de destination
$receiving_email_address = 'louiscampagne@orange.fr';

// Redirection en cas de succès ou d'erreur (à personnaliser)
$success_url = 'index.html?status=success#contact'; // Retourne à l'accueil avec un message de succès
$error_url = 'index.html?status=error#contact';   // Retourne à l'accueil avec un message d'erreur

// ----------------------------------------------------
// 2. VÉRIFICATION DE LA MÉTHODE ET DES DONNÉES
// ----------------------------------------------------

// Vérifie si la requête est bien de type POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    // Si ce n'est pas le cas, redirige vers l'URL d'erreur
    header("Location: $error_url");
    exit;
}

// Récupère les données du formulaire et les nettoie (sécurité de base)
$name    = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$email   = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_STRING);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

// Vérifie si les champs obligatoires sont remplis et l'e-mail valide
if (empty($name) || empty($email) || empty($subject) || empty($message) || $email === false) {
    // Si une donnée manque ou l'e-mail est invalide, redirige
    header("Location: $error_url");
    exit;
}

// ----------------------------------------------------
// 3. CONSTRUCTION ET ENVOI DE L'EMAIL
// ----------------------------------------------------

// L'objet de l'e-mail que vous allez recevoir
$mail_subject = "Message Portfolio: " . $subject;

// Le corps du message
$mail_body = "Vous avez reçu un nouveau message via votre portfolio.\n\n" .
             "Nom: $name\n" .
             "Email: $email\n" .
             "Objet: $subject\n\n" .
             "Message:\n$message";

// Les en-têtes (headers) pour un e-mail propre
$headers = "From: " . $name . " <" . $email . ">\r\n" .
           "Reply-To: " . $email . "\r\n" .
           "MIME-Version: 1.0\r\n" .
           "Content-Type: text/plain; charset=UTF-8";

// Utilisation de la fonction mail() de PHP pour envoyer l'e-mail
$mail_sent = mail($receiving_email_address, $mail_subject, $mail_body, $headers);

// ----------------------------------------------------
// 4. GESTION DE LA RÉPONSE
// ----------------------------------------------------

if ($mail_sent) {
    // Si l'envoi réussit
    header("Location: $success_url");
} else {
    // Si l'envoi échoue
    header("Location: $error_url");
}

exit;
?>