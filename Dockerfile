# 1. start from official lightweight Python base image (Bullseye is correct)
FROM python:3.10-slim-bullseye

# 2. set environment variables for Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 3. Set the working directory inside the container.
WORKDIR /app

# COPY AND SETUP THE ENTRYPOINT SXTIPT ---
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# 4.copy the requirements file FIRST [crucial optimization hbb]
COPY backend/requirements.txt .

# 5. Install the Python dependencies.
RUN pip install --no-cache-dir -r requirements.txt

# 6. Copy the rest of the backend application code.
#    Simplification: Just copy everything in the project root to /app
COPY . /app/

# Tell Python to look for modules in the /app directory.
ENV PYTHONPATH=/app

# 7. Expose port
EXPOSE 8000

# 8. the command to run when the container starts.
ENTRYPOINT ["/entrypoint.sh"]
CMD ["gunicorn", "--bind","0.0.0.0:8000","backend.wsgi:application"]