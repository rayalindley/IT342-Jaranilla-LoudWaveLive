package com.example.loudwavelive_mobile.validation

class PasswordValidation : ValidationStrategy {
    override fun validate(input: String): Boolean {
        return input.length >= 6
    }
}