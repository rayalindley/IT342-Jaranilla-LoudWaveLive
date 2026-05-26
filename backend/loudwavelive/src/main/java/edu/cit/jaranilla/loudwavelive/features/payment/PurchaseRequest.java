package edu.cit.jaranilla.loudwavelive.features.payment;
import lombok.Data;

@Data
public class PurchaseRequest {
    private Long ticketTypeId;
    private Integer quantity;
    private Long userId;
    private String userEmail;
    private String sessionId;
}