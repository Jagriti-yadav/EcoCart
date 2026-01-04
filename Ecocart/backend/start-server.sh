#!/bin/bash

# EcoCart Spring Boot Backend Startup Script

echo "======================================"
echo "   EcoCart Spring Boot Backend"
echo "======================================"
echo ""

# Check if Java is installed
if ! command -v java &> /dev/null
then
    echo "❌ Java is not installed. Please install Java 21 or higher."
    exit 1
fi

# Display Java version
echo "✅ Java version:"
java -version
echo ""

# Navigate to backend directory
cd "$(dirname "$0")"

echo "🚀 Starting Spring Boot application..."
echo "📍 Server will run on: http://localhost:8080"
echo "📡 API endpoints: http://localhost:8080/api/products"
echo ""
echo "Press Ctrl+C to stop the server"
echo "======================================"
echo ""

# Run the application
./mvnw spring-boot:run
