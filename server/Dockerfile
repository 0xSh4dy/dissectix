FROM python:3.10.13-bullseye
WORKDIR /server
COPY ./ ./
RUN pip install -r /server/requirements.txt
EXPOSE 8000
CMD ["python3","/server/manage.py","runserver","0.0.0.0:8000"]