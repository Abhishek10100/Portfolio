---
title: Student Performance Indicator
emoji: 🎓
colorFrom: green
colorTo: gray
sdk: docker
app_port: 7860
pinned: false
---

# Student Performance Indicator

Flask app that predicts a student's math score from demographic and academic inputs, using a CatBoost/XGBoost regression model trained on the [Students Performance](https://www.kaggle.com/datasets/spscientist/students-performance-in-exams) dataset.

Enter gender, ethnicity group, parental education, lunch type, test prep status, and reading/writing scores to get a predicted math score.

Source: `src/` (data ingestion → transformation → model training pipeline), `artifacts/` (trained model + preprocessor), `app.py` (Flask route).
