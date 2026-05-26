package edu.cit.jaranilla.loudwavelive.features.ticket;

import org.springframework.stereotype.Service;
import java.security.SecureRandom;
import java.time.Instant;

@Service
public class TicketCodeService {

    private static final SecureRandom random = new SecureRandom();
    private static final String TICKET_CODE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    /**
     * Generates a unique ticket code (32 characters)
     */
    public String generateTicketCode() {
        StringBuilder ticketCode = new StringBuilder(32);

        for (int i = 0; i < 32; i++) {
            ticketCode.append(TICKET_CODE_CHARS.charAt(random.nextInt(TICKET_CODE_CHARS.length())));
        }

        return ticketCode.toString();
    }

    /**
     * Generates a ticket reference number (e.g., TKT-20260524-ABC123)
     */
    public String generateTicketReference() {
        Instant now = Instant.now();
        String date = String.format("%d%02d%02d",
                now.atZone(java.time.ZoneId.systemDefault()).getYear(),
                now.atZone(java.time.ZoneId.systemDefault()).getMonthValue(),
                now.atZone(java.time.ZoneId.systemDefault()).getDayOfMonth());
        
        String random = generateRandomCode(6);
        return "TKT-" + date + "-" + random;
    }

    /**
     * Generates random alphanumeric string of specified length
     */
    private String generateRandomCode(int length) {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder code = new StringBuilder();
        
        for (int i = 0; i < length; i++) {
            code.append(chars.charAt(random.nextInt(chars.length())));
        }
        
        return code.toString();
    }

    /**
     * Validates ticket code format
     */
    public boolean isValidTicketCode(String ticketCode) {
        return ticketCode != null && ticketCode.length() == 32 && ticketCode.matches("[a-zA-Z0-9]+");
    }
}
