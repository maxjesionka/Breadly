FROM python:3.9.7

WORKDIR /usr/src/app

COPY require_libraries.txt ./

RUN pip install --no-cache-dir -r require_libraries.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "127.0.0.1", "--port", "8000"]


