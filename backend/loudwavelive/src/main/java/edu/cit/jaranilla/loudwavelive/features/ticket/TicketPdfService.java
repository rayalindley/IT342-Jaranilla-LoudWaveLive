package edu.cit.jaranilla.loudwavelive.features.ticket;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.graphics.image.LosslessFactory;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class TicketPdfService {

        /**
         * Generates a simple PDF ticket using Apache PDFBox and ZXing for QR codes
         */
        public byte[] generateTicketPdf(
                        String ticketCode,
                        String eventTitle,
                        String artist,
                        String venue,
                        LocalDateTime eventDate,
                        String userName,
                        String userEmail,
                        String ticketType,
                        int quantity,
                        double totalPrice) throws Exception {

                try (PDDocument doc = new PDDocument()) {
                        PDPage page = new PDPage(PDRectangle.A4);
                        doc.addPage(page);

                        PDPageContentStream cs = new PDPageContentStream(doc, page);

                        float margin = 50;
                        float y = page.getMediaBox().getHeight() - margin;

                        // Header
                        cs.beginText();
                        cs.setFont(PDType1Font.HELVETICA_BOLD, 22);
                        cs.newLineAtOffset(margin, y);
                        cs.showText("LOUDWAVELIVE - Digital Ticket");
                        cs.endText();

                        y -= 30;

                        // Event title
                        cs.beginText();
                        cs.setFont(PDType1Font.HELVETICA_BOLD, 18);
                        cs.newLineAtOffset(margin, y);
                        cs.showText(eventTitle);
                        cs.endText();

                        y -= 24;

                        // Artist
                        if (artist != null && !artist.isEmpty()) {
                                cs.beginText();
                                cs.setFont(PDType1Font.HELVETICA_OBLIQUE, 12);
                                cs.newLineAtOffset(margin, y);
                                cs.showText("Featuring: " + artist);
                                cs.endText();
                                y -= 18;
                        }

                        // Event details
                        cs.beginText();
                        cs.setFont(PDType1Font.HELVETICA, 12);
                        cs.newLineAtOffset(margin, y);
                        cs.showText("Date: " + formatDateTime(eventDate));
                        cs.endText();
                        y -= 16;

                        cs.beginText();
                        cs.setFont(PDType1Font.HELVETICA, 12);
                        cs.newLineAtOffset(margin, y);
                        cs.showText("Venue: " + (venue == null ? "TBA" : venue));
                        cs.endText();
                        y -= 22;

                        cs.beginText();
                        cs.setFont(PDType1Font.HELVETICA, 12);
                        cs.newLineAtOffset(margin, y);
                        cs.showText("Ticket Type: " + ticketType + "    Quantity: " + quantity + "    Total: $" + String.format("%.2f", totalPrice));
                        cs.endText();
                        y -= 30;

                        // Attendee
                        cs.beginText();
                        cs.setFont(PDType1Font.HELVETICA_BOLD, 12);
                        cs.newLineAtOffset(margin, y);
                        cs.showText("Attendee: " + userName + " <" + userEmail + ">");
                        cs.endText();
                        y -= 40;

                        // QR Code generation
                        BufferedImage qr = generateQRCodeImage(ticketCode, 200, 200);
                        PDImageXObject pdImage = LosslessFactory.createFromImage(doc, qr);

                        float qrX = page.getMediaBox().getWidth() - margin - 120;
                        float qrY = y - 40;
                        cs.drawImage(pdImage, qrX, qrY, 120, 120);

                        // Ticket code text
                        cs.beginText();
                        cs.setFont(PDType1Font.COURIER_BOLD, 11);
                        cs.newLineAtOffset(margin, qrY + 40);
                        cs.showText("Ticket Code: " + ticketCode);
                        cs.endText();

                        // Footer
                        cs.beginText();
                        cs.setFont(PDType1Font.HELVETICA_OBLIQUE, 9);
                        cs.newLineAtOffset(margin, 60);
                        cs.showText("This ticket is valid for entry. Present the QR code at the gate.");
                        cs.endText();

                        cs.close();

                        ByteArrayOutputStream baos = new ByteArrayOutputStream();
                        doc.save(baos);
                        return baos.toByteArray();
                }
        }

        private BufferedImage generateQRCodeImage(String text, int width, int height) throws Exception {
                BitMatrix bitMatrix = new MultiFormatWriter().encode(text, BarcodeFormat.QR_CODE, width, height);
                return MatrixToImageWriter.toBufferedImage(bitMatrix);
        }

        private String formatDateTime(LocalDateTime dateTime) {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM dd, yyyy @ HH:mm");
                return dateTime.format(formatter);
        }

}
