package com.example.loudwavelive_mobile.validation

interface ValidationStrategy {
    fun validate(input: String): Boolean
}