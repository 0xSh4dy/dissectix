FROM python:3.10.13-bullseye
WORKDIR /server
COPY ./ ./
RUN pip install -r /server/requirements.txt
RUN apt-get update
RUN apt-get install rustc vim -y
EXPOSE 8000
RUN python3 /server/manage.py migrate
CMD ["python3","/server/manage.py","runserver","0.0.0.0:8000"]