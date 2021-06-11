FROM python:3
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
RUN python -m pip install daphne
COPY entrypoint.sh /code/
RUN chmod 777 entrypoint.sh