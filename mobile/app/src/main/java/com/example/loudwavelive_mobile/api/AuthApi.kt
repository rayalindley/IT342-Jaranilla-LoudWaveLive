package com.example.loudwavelive_mobile.api
import com.example.loudwavelive_mobile.model.LoginRequest
import com.example.loudwavelive_mobile.model.RegisterRequest
import com.example.loudwavelive_mobile.model.UserResponse
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface AuthApi {
    @POST("api/v1/auth/register")
    fun register(
        @Body request: RegisterRequest
    ): Call<UserResponse>

    @POST("api/v1/auth/login")
    fun login(
        @Body request: LoginRequest
    ): Call<UserResponse>
}