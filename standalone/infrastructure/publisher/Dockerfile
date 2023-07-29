FROM mcr.microsoft.com/dotnet/runtime:7.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["publisher.csproj", "./"]
RUN dotnet restore "publisher.csproj"
COPY . .
WORKDIR "/src/"
RUN dotnet build "publisher.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "publisher.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "publisher.dll"]
