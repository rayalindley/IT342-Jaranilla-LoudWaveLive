package edu.cit.jaranilla.loudwavelive.features.ticket;
import lombok.Data;

@Data
public class TicketTypeRequest {
    private String name;
    private Double price;
    private Integer quantityAvailable;
}