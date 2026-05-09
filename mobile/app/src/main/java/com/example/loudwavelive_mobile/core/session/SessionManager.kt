package com.example.loudwavelive_mobile.core.session

object SessionManager {
    private val observers = mutableListOf<(Boolean) -> Unit>()

    var isLoggedIn = false
        set(value) {
            field = value
            notifyObservers()
        }

    fun observe(observer: (Boolean) -> Unit) {
        observers.add(observer)
    }

    private fun notifyObservers() {
        observers.forEach { it(isLoggedIn) }
    }
}