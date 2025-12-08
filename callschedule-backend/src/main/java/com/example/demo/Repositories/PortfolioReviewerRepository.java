package com.example.demo.Repositories;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.demo.Models.PortfolioReviewer;



public interface PortfolioReviewerRepository extends MongoRepository<PortfolioReviewer, String> {
    List<PortfolioReviewer> findByDate(LocalDate date);
    PortfolioReviewer findByHandlerIdAndDate(String handlerId, LocalDate date);
}
