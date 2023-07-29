// See https://aka.ms/new-console-template for more information


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
string queue = "demo";
string routingKey = "demo";

channel.ExchangeDeclare(exchange, "direct");
channel.QueueDeclare(queue, durable: true, exclusive: false, autoDelete: false, arguments: null);
channel.QueueBind(queue, exchange, routingKey);

for (var i = 0; i < 1000; i++)
{
    var message = $"Hello World! Message: {i}";
    var body = Encoding.UTF8.GetBytes(message);

    channel.BasicPublish(
        exchange: exchange,
        routingKey: routingKey,
        basicProperties: null,
        body: body
    );
            
    Console.WriteLine($"Sent: {message}");
}

Console.WriteLine("Press any key to exit...");
Console.ReadKey();