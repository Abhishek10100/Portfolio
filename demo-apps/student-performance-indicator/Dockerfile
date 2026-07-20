FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn

COPY . .

# Hugging Face Spaces (Docker SDK) expects the app on port 7860
ENV PORT=7860
EXPOSE 7860

CMD ["gunicorn", "-b", "0.0.0.0:7860", "app:app"]
