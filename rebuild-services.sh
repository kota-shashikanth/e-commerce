#!/bin/bash

# Script to rebuild and restart microservices for development

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to display usage
function show_usage {
  echo -e "${YELLOW}Usage:${NC}"
  echo -e "  $0 [service_name]"
  echo -e ""
  echo -e "${YELLOW}Arguments:${NC}"
  echo -e "  service_name    Optional. Specific service to rebuild (order-service, inventory-service, email-service)"
  echo -e "                  If not provided, all services will be rebuilt"
  echo -e ""
  echo -e "${YELLOW}Examples:${NC}"
  echo -e "  $0                     # Rebuild all services"
  echo -e "  $0 order-service       # Rebuild only the order service"
}

# Function to rebuild a specific service
function rebuild_service {
  local service=$1
  
  echo -e "${YELLOW}Stopping $service...${NC}"
  docker-compose -f docker-compose.dev.yml stop $service
  
  echo -e "${YELLOW}Removing $service container...${NC}"
  docker-compose -f docker-compose.dev.yml rm -f $service
  
  echo -e "${YELLOW}Rebuilding $service image...${NC}"
  docker-compose -f docker-compose.dev.yml build $service
  
  echo -e "${YELLOW}Starting $service...${NC}"
  docker-compose -f docker-compose.dev.yml up -d $service
  
  echo -e "${GREEN}$service has been rebuilt and restarted!${NC}"
}

# Check if help is requested
if [[ "$1" == "--help" || "$1" == "-h" ]]; then
  show_usage
  exit 0
fi

# Make sure Docker is running
if ! docker info > /dev/null 2>&1; then
  echo -e "${RED}Error: Docker is not running. Please start Docker and try again.${NC}"
  exit 1
fi

# Check if docker-compose.dev.yml exists
if [ ! -f "docker-compose.dev.yml" ]; then
  echo -e "${RED}Error: docker-compose.dev.yml not found in the current directory.${NC}"
  exit 1
fi

# If a specific service is provided, rebuild only that service
if [ ! -z "$1" ]; then
  case "$1" in
    order-service|inventory-service|email-service)
      rebuild_service $1
      ;;
    *)
      echo -e "${RED}Error: Unknown service '$1'${NC}"
      echo -e "Valid services are: order-service, inventory-service, email-service"
      exit 1
      ;;
  esac
else
  # Rebuild all services
  echo -e "${YELLOW}Rebuilding all services...${NC}"
  
  # Make sure infrastructure services are running
  echo -e "${YELLOW}Ensuring infrastructure services are running...${NC}"
  docker-compose -f docker-compose.dev.yml up -d mongo kafka
  
  # Rebuild each service
  rebuild_service "order-service"
  rebuild_service "inventory-service"
  rebuild_service "email-service"
  
  echo -e "${GREEN}All services have been rebuilt and restarted!${NC}"
fi

# Show running containers
echo -e "${YELLOW}Running containers:${NC}"
docker-compose -f docker-compose.dev.yml ps
