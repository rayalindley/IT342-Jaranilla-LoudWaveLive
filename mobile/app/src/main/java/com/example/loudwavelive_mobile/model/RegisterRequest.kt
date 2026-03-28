package com.example.loudwavelive_mobile.model

data class RegisterRequest (
    val firstname: String,
    val lastname: String,
    val email: String,
    val password: String,
    val role: String = "ATTENDEE"
)