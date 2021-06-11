FROM python:3
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
RUN python -m pip install daphne
COPY entrypoint.sh /code/
COPY wait-for-it.sh /code/
RUN chmod 777 entrypoint.sh
RUN chmod 777 wait-for-it.sh
