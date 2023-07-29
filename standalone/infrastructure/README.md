# rabbitmq-setup
RabbitMQ stack setup with prometheus &amp; grafana monitoring

Simple configuration allowing you to run a `publisher` and a `consumer` console applications that mimick publishing / consuming rabbitmq messages.

Steps to run: 

1. Ensure you copy the `.env.example` file to `.env`

2. Run `docker-compose up` to stand everything up.

3. Run `./setup-certs.sh` to create certificates for each rabbitmq container.

4. Access rabbitmq at http://localhost:15672 using credentials from the `.env` file and grafana at http://localhost:3000 (admin/admin - you will be asked to change the credentials) 

5. Optionally, run both `publisher` and `consumer` console applications to create some traffic. You can watch the metrics in the included grafana dashboards.

6. Profit
