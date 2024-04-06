 # Use an official Python runtime as a base image
FROM python:3.9.13

WORKDIR /app

COPY . /app

# Install any needed dependencies specified in requirements.txt
RUN pip install fastapi pydantic uvicorn

# Make port 80 available to the world outside this container
EXPOSE 8000

# Run app.py when the container launches
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
