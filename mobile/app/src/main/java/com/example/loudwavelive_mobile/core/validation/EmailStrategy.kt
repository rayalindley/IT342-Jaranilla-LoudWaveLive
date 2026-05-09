package com.example.loudwavelive_mobile.core.validation

class EmailValidation : ValidationStrategy {
    override fun validate(input: String): Boolean {
        return android.util.Patterns.EMAIL_ADDRESS.matcher(input).matches()
    }
}