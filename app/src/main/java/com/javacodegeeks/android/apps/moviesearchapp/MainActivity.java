package com.javacodegeeks.android.apps.moviesearchapp;

import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.View.OnFocusChangeListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class MainActivity extends AppCompatActivity {

    private static final String EMPTY_STRING = "";

    private EditText searchEditText;
    private RadioButton moviesSearchRadioButton;
    private RadioButton peopleSearchRadioButton;
    private RadioGroup searchRadioGroup;
    private TextView searchTypeTextView;
    private Button searchButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        this.findAllViewsById();

        moviesSearchRadioButton.setOnClickListener(radioButtonListener);
        peopleSearchRadioButton.setOnClickListener(radioButtonListener);

        searchButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                String query = searchEditText.getText().toString();
                if (moviesSearchRadioButton.isChecked()) {
                    longToast(moviesSearchRadioButton.getText() + " " + query);
                }
                else if (peopleSearchRadioButton.isChecked()) {
                    longToast(peopleSearchRadioButton.getText() + " " + query);
                }
            }
        });

        searchEditText.setOnFocusChangeListener(new DftTextOnFocusListener(getString(R.string.search)));

        int id = searchRadioGroup.getCheckedRadioButtonId();
        RadioButton radioButton = (RadioButton) findViewById(id);
        searchTypeTextView.setText(radioButton.getText());
    }

    private void findAllViewsById() {
        searchEditText = (EditText) findViewById(R.id.search_edit_text);
        moviesSearchRadioButton = (RadioButton) findViewById(R.id.movie_search_radio_button);
        peopleSearchRadioButton = (RadioButton) findViewById(R.id.people_search_radio_button);
        searchRadioGroup = (RadioGroup) findViewById(R.id.search_radio_group);
        searchTypeTextView = (TextView) findViewById(R.id.search_type_text_view);
        searchButton = (Button) findViewById(R.id.search_button);
    }

    public void longToast(CharSequence message) {
        Toast.makeText(this, message, Toast.LENGTH_LONG).show();
    }

    private OnClickListener radioButtonListener = new OnClickListener() {
        public void onClick(View v) {
            RadioButton radioButton = (RadioButton) v;
            searchTypeTextView.setText(radioButton.getText());
        }
    };

    private class DftTextOnFocusListener implements OnFocusChangeListener {

        private String defaultText;

        public DftTextOnFocusListener(String defaultText) {
            this.defaultText = defaultText;
        }

        public void onFocusChange(View v, boolean hasFocus) {
            if (v instanceof EditText) {
                EditText focusedEditText = (EditText) v;
                // handle obtaining focus
                if (hasFocus) {
                    if (focusedEditText.getText().toString().equals(defaultText)) {
                        focusedEditText.setText(EMPTY_STRING);
                    }
                }
                // handle losing focus
                else {
                    if (focusedEditText.getText().toString().equals(EMPTY_STRING)) {
                        focusedEditText.setText(defaultText);
                    }
                }
            }
        }

    }

}