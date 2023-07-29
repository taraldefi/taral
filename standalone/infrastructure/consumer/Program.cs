using System.Text;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

var factory = new ConnectionFactory()
{
    UserName = "admin",
    Password = "supersecretpassword",
    AutomaticRecoveryEnabled = true,
    NetworkRecoveryInterval = TimeSpan.FromSeconds(10)
};
        
var endPoints = new List<AmqpTcpEndpoint>
{
    new AmqpTcpEndpoint("localhost", 5672),
    new AmqpTcpEndpoint("localhost", 5673)
};

using var connection = factory.CreateConnection(endPoints);
using var channel = connection.CreateModel();

string exchange = "my_exchange";
string queueName = "demo";

channel.ExchangeDeclare(exchange, "direct");
channel.QueueDeclare(queueName, durable: true, exclusive: false, autoDelete: false, arguments: null);
channel.QueueBind(queueName, exchange, queueName);

var consumer = new EventingBasicConsumer(channel);
consumer.Received += (model, ea) =>
{
    var body = ea.Body.ToArray();
    var message = Encoding.UTF8.GetString(body);
    Console.WriteLine($"Received: {message}");
};
channel.BasicConsume(queue: queueName,
    autoAck: true,
    consumer: consumer);

Console.WriteLine("Press [enter] to exit.");
Console.ReadLine();