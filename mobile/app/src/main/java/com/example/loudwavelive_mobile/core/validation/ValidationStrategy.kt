package com.example.loudwavelive_mobile.core.validation

interface ValidationStrategy {
    fun validate(input: String): Boolean
}