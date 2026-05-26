package edu.cit.jaranilla.loudwavelive.features.notification;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Value("${spring.mail.username:}")
    private String mailUsername;

    /**
     * Sends ticket confirmation email with PDF attachment
     */
    public void sendTicketConfirmationEmail(
            String userEmail,
            String userName,
            String eventTitle,
            String ticketCode,
            byte[] ticketPdf,
            String ticketReference) throws MessagingException {

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        // Set email properties
        helper.setFrom(mailUsername);
        helper.setTo(userEmail);
        helper.setSubject("Your " + eventTitle + " Ticket - " + ticketReference);

        // Create email content using template
        Context context = new Context();
        context.setVariable("userName", userName);
        context.setVariable("eventTitle", eventTitle);
        context.setVariable("ticketCode", ticketCode);
        context.setVariable("ticketReference", ticketReference);

        String htmlContent = templateEngine.process("email/purchase-confirmation", context);
        helper.setText(htmlContent, true);

        // Add PDF attachment
        helper.addAttachment(
                ticketReference + ".pdf",
                new ByteArrayResource(ticketPdf),
                "application/pdf"
        );

        // Send email
        javaMailSender.send(mimeMessage);
    }

    /**
     * Sends generic email notification
     */
    public void sendEmail(
            String to,
            String subject,
            String htmlContent) throws MessagingException {

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        helper.setFrom(mailUsername);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true);

        javaMailSender.send(mimeMessage);
    }

    /**
     * Helper class for byte array resource
     */
    public static class ByteArrayResource extends org.springframework.core.io.ByteArrayResource {
        private final String filename;

        public ByteArrayResource(byte[] byteArray, String filename) {
            super(byteArray);
            this.filename = filename;
        }

        public ByteArrayResource(byte[] byteArray) {
            super(byteArray);
            this.filename = "ticket.pdf";
        }

        @Override
        public String getFilename() {
            return filename;
        }
    }
}
