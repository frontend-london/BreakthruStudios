<?php 

    
        $name = ($_POST['name']);
        $email = ($_POST['email']);
        $content = ($_POST['content']);
        
        $to = 'tomek@breakthrustudios.pl';
        $subject = 'Wiadomość od użytkownika strony BreakThru Studios';
        $message = "Imię i nazwisko: $name <br />\n Adres email: $email <br />\n Treść wiadomości: $content";
        
        $headers  = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-2' . "\r\n";
        
        $subject_iso = iconv("UTF-8","ISO-8859-2",$subject);
        $message_iso = iconv("UTF-8","ISO-8859-2",$message);
        
        mail ($to , $subject_iso , $message_iso , $headers);
    
    
?>
