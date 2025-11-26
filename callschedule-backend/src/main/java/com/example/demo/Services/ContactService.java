package com.example.demo.Services;

import com.example.demo.dto.ContactMessageRequest; 

public interface ContactService {

    void processForm(ContactMessageRequest dto);

}