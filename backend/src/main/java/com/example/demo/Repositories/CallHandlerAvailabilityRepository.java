package com.example.demo.Repositories;


import java.time.LocalDate;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.Models.CallHandlerAvailability;

public interface CallHandlerAvailabilityRepository extends MongoRepository<CallHandlerAvailability, String> {
    List<CallHandlerAvailability> findByDate(LocalDate date);
    CallHandlerAvailability findByHandlerIdAndDate(String handlerId, LocalDate date);
}
