package com.example.demo.Models;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "call_handler_availability")
public class CallHandlerAvailability {

    @Id
    private String id;

    private String handlerId;   // Admin (CALL_HANDLER) ID
    private LocalDate date;

    private List<String> unavailableSlots;  // ["10:00", "11:00"]
}
