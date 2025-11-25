package com.example.demo.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.demo.Models.ReviewPortfolio;

public interface ReviewPortfolioRepository extends MongoRepository<ReviewPortfolio, String> {
}
