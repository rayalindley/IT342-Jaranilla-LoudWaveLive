package edu.cit.jaranilla.loudwavelive.features.payment;
import lombok.Data;

@Data
public class PurchaseRequest {
    private Long ticketTypeId;
    private Integer quantity;
    private String userId;
    private String userEmail;
}