package com.example.loudwavelive_mobile.features.auth

import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.text.SpannableString
import android.text.style.ForegroundColorSpan
import android.view.LayoutInflater
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import com.example.loudwavelive_mobile.R
import com.example.loudwavelive_mobile.adapter.UserAdapter
import com.example.loudwavelive_mobile.core.api.RetrofitClient
import com.example.loudwavelive_mobile.model.LoginRequest
import com.example.loudwavelive_mobile.model.UserResponse
import com.example.loudwavelive_mobile.model.UserUI
import com.example.loudwavelive_mobile.core.session.SessionManager
import com.example.loudwavelive_mobile.features.home.HomeActivity
import com.google.android.material.bottomsheet.BottomSheetDialog
import com.google.android.material.snackbar.Snackbar
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val email = findViewById<EditText>(R.id.etEmail)
        val password = findViewById<EditText>(R.id.etPassword)
        val btnLogin = findViewById<Button>(R.id.btnLogin)

        val text = SpannableString("Don't have an account? Register")
        text.setSpan(ForegroundColorSpan(Color.parseColor("#FF8FCF")), 23, 31, 0)
        val tvRegister = findViewById<TextView>(R.id.tvRegister)
        tvRegister.text = text
        val rootView = findViewById<View>(android.R.id.content)

        btnLogin.setOnClickListener {
            val request = LoginRequest(
                email.text.toString(),
                password.text.toString()
            )

            RetrofitClient.instance.login(request)
                .enqueue(object : Callback<UserResponse> {
                    override fun onResponse(
                        call: Call<UserResponse>,
                        response: Response<UserResponse>
                    ) {
                        if(response.isSuccessful && response.body()!=null) {
                            val uiUser = UserAdapter.fromApi(response.body()!!)
                            SessionManager.isLoggedIn = true
                            showSuccessSheet(uiUser)
                        } else {
                            btnLogin.isEnabled = true
                            btnLogin.text = "Sign in"
                            Snackbar.make(rootView, "Login failed. Please check your credentials.", Snackbar.LENGTH_LONG)
                                .setBackgroundTint(0xFF2A1A1A.toInt())
                                .setTextColor(0xFFFF8FCF.toInt())
                                .show()
                        }
                    }

                    override fun onFailure(call: Call<UserResponse>, t: Throwable) {
                        btnLogin.isEnabled = true
                        btnLogin.text = "Sign in"
                        Snackbar.make(rootView, "Network error. Check your connection.", Snackbar.LENGTH_LONG)
                            .setBackgroundTint(0xFF2A1A1A.toInt())
                            .setTextColor(0xFFFF8FCF.toInt())
                            .show()
                    }
                })
        }
    }

    private fun showSuccessSheet(uiUser: UserUI) {
        val dialog = BottomSheetDialog(this, R.style.SuccessBottomSheetTheme)
        val sheetView = LayoutInflater.from(this)
            .inflate(R.layout.bottom_sheet_login_success, null)
        dialog.setContentView(sheetView)
        dialog.setCancelable(false)

        Handler(Looper.getMainLooper()).postDelayed({
            dialog.dismiss()
            val intent = Intent(this, HomeActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
            }

            Toast.makeText(
                this@LoginActivity,
                "Welcome ${uiUser.displayName}",
                Toast.LENGTH_SHORT
            ).show()

            startActivity(intent)
            finish()
        }, 2500)

        dialog.show()
    }
}