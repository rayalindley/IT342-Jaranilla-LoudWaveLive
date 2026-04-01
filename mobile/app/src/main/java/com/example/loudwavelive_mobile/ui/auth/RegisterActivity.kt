package com.example.loudwavelive_mobile.ui.auth

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.LayoutInflater
import android.view.View
import android.widget.Button
import android.widget.EditText
import androidx.appcompat.app.AppCompatActivity
import com.example.loudwavelive_mobile.R
import com.example.loudwavelive_mobile.api.RetrofitClient
import com.example.loudwavelive_mobile.model.RegisterRequest
import com.google.android.material.bottomsheet.BottomSheetDialog
import com.google.android.material.snackbar.Snackbar
import com.google.android.material.textfield.TextInputLayout
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class RegisterActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        val tilFirstName     = findViewById<TextInputLayout>(R.id.tilFirstName)
        val tilLastName      = findViewById<TextInputLayout>(R.id.tilLastName)
        val tilEmail         = findViewById<TextInputLayout>(R.id.tilEmail)
        val tilPassword      = findViewById<TextInputLayout>(R.id.tilPassword)
        val tilConfirmPass   = findViewById<TextInputLayout>(R.id.tilConfirmPassword)

        val etFirstName      = findViewById<EditText>(R.id.etFirstName)
        val etLastName       = findViewById<EditText>(R.id.etLastName)
        val etEmail          = findViewById<EditText>(R.id.etEmail)
        val etPassword       = findViewById<EditText>(R.id.etPassword)
        val etConfirmPass    = findViewById<EditText>(R.id.etConfirmPassword)
        val btnRegister      = findViewById<Button>(R.id.btnRegister)
        val rootView         = findViewById<View>(android.R.id.content)

        btnRegister.setOnClickListener {
            tilFirstName.error   = null
            tilLastName.error    = null
            tilEmail.error       = null
            tilPassword.error    = null
            tilConfirmPass.error = null

            val first       = etFirstName.text.toString().trim()
            val last        = etLastName.text.toString().trim()
            val userEmail   = etEmail.text.toString().trim()
            val pass        = etPassword.text.toString()
            val confirmPass = etConfirmPass.text.toString()

            var hasError = false
            if (first.isEmpty()) {
                tilFirstName.error = "Required"
                hasError = true
            }
            if (last.isEmpty()) {
                tilLastName.error = "Required"
                hasError = true
            }
            if (userEmail.isEmpty()) {
                tilEmail.error = "Required"
                hasError = true
            }
            if (pass.isEmpty()) {
                tilPassword.error = "Required"
                hasError = true
            }
            if (confirmPass.isEmpty()) {
                tilConfirmPass.error = "Required"
                hasError = true
            }
            if (hasError) return@setOnClickListener

            if (pass != confirmPass) {
                tilConfirmPass.error = "Passwords do not match"
                return@setOnClickListener
            }

            btnRegister.isEnabled = false
            btnRegister.text = "Creating account..."

            val request = RegisterRequest(first, last, userEmail, pass)

            RetrofitClient.instance.register(request)
                .enqueue(object : Callback<Void> {

                    override fun onResponse(call: Call<Void>, response: Response<Void>) {
                        if (response.isSuccessful) {
                            showSuccessSheet()
                        } else {
                            btnRegister.isEnabled = true
                            btnRegister.text = "Create Account"
                            Snackbar.make(rootView, "Registration failed. Please try again.", Snackbar.LENGTH_LONG)
                                .setBackgroundTint(0xFF2A1A1A.toInt())
                                .setTextColor(0xFFFF8FCF.toInt())
                                .show()
                        }
                    }

                    override fun onFailure(call: Call<Void>, t: Throwable) {
                        btnRegister.isEnabled = true
                        btnRegister.text = "Create Account"
                        Snackbar.make(rootView, "Network error. Check your connection.", Snackbar.LENGTH_LONG)
                            .setBackgroundTint(0xFF2A1A1A.toInt())
                            .setTextColor(0xFFFF8FCF.toInt())
                            .show()
                    }
                })
        }
    }

    private fun showSuccessSheet() {
        val dialog = BottomSheetDialog(this, R.style.SuccessBottomSheetTheme)
        val sheetView = LayoutInflater.from(this)
            .inflate(R.layout.bottom_sheet_register_success, null)
        dialog.setContentView(sheetView)
        dialog.setCancelable(false)

        Handler(Looper.getMainLooper()).postDelayed({
            dialog.dismiss()
            val intent = Intent(this, LoginActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
            }
            startActivity(intent)
            finish()
        }, 2500)

        dialog.show()
    }
}