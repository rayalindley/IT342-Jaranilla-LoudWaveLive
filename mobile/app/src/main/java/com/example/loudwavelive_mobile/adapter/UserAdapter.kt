package com.example.loudwavelive_mobile.adapter
import com.example.loudwavelive_mobile.model.UserResponse
import com.example.loudwavelive_mobile.model.UserUI

object UserAdapter {
    fun fromApi(user: UserResponse): UserUI {
        return UserUI(
            displayName = "${user.firstname} ${user.lastname}",
            email = user.email
        )
    }
}