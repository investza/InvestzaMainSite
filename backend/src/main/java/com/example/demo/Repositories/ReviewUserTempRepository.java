package com.example.demo.Repositories;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.demo.Models.ReviewUserTemp;

public interface ReviewUserTempRepository extends MongoRepository<ReviewUserTemp, String> {
    Optional<ReviewUserTemp> findByMobile(String mobile);
}

