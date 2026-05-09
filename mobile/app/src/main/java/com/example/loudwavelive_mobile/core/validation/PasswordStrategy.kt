package com.example.loudwavelive_mobile.core.validation

class PasswordValidation : ValidationStrategy {
    override fun validate(input: String): Boolean {
        return input.length >= 6
    }
}