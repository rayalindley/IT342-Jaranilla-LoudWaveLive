package com.example.loudwavelive_mobile

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.loudwavelive_mobile.ui.auth.LoginActivity
import com.example.loudwavelive_mobile.ui.auth.RegisterActivity
import com.example.loudwavelive_mobile.ui.home.HomeActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_home)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        val registerBtn = findViewById<Button>(R.id.btnRegister);
        registerBtn.setOnClickListener {
            val intent = Intent(this, RegisterActivity::class.java);
            startActivity(intent);
        }

        val loginBtn = findViewById<Button>(R.id.btnLogin);
        loginBtn.setOnClickListener {
            val intent = Intent(this, LoginActivity::class.java);
            startActivity(intent);
        }
    }
}