@echo off
setlocal enabledelayedexpansion

:: Script to rebuild and restart microservices for development on Windows

:: Function to display usage
:show_usage
echo Usage:
echo   %0 [service_name]
echo.
echo Arguments:
echo   service_name    Optional. Specific service to rebuild (order-service, inventory-service, email-service)
echo                   If not provided, all services will be rebuilt
echo.
echo Examples:
echo   %0                     # Rebuild all services
echo   %0 order-service       # Rebuild only the order service
goto :eof

:: Function to rebuild a specific service
:rebuild_service
echo Stopping %~1...
docker-compose -f docker-compose.dev.yml stop %~1

echo Removing %~1 container...
docker-compose -f docker-compose.dev.yml rm -f %~1

echo Rebuilding %~1 image...
docker-compose -f docker-compose.dev.yml build %~1

echo Starting %~1...
docker-compose -f docker-compose.dev.yml up -d %~1

echo %~1 has been rebuilt and restarted!
goto :eof

:: Check if help is requested
if "%1"=="--help" goto show_usage
if "%1"=="-h" goto show_usage

:: Make sure Docker is running
docker info > nul 2>&1
if %ERRORLEVEL% neq 0 (
  echo Error: Docker is not running. Please start Docker and try again.
  exit /b 1
)

:: Check if docker-compose.dev.yml exists
if not exist "docker-compose.dev.yml" (
  echo Error: docker-compose.dev.yml not found in the current directory.
  exit /b 1
)

:: If a specific service is provided, rebuild only that service
if not "%1"=="" (
  if "%1"=="order-service" (
    call :rebuild_service order-service
  ) else if "%1"=="inventory-service" (
    call :rebuild_service inventory-service
  ) else if "%1"=="email-service" (
    call :rebuild_service email-service
  ) else (
    echo Error: Unknown service '%1'
    echo Valid services are: order-service, inventory-service, email-service
    exit /b 1
  )
) else (
  :: Rebuild all services
  echo Rebuilding all services...
  
  :: Make sure infrastructure services are running
  echo Ensuring infrastructure services are running...
  docker-compose -f docker-compose.dev.yml up -d mongo kafka
  
  :: Rebuild each service
  call :rebuild_service order-service
  call :rebuild_service inventory-service
  call :rebuild_service email-service
  
  echo All services have been rebuilt and restarted!
)

:: Show running containers
echo Running containers:
docker-compose -f docker-compose.dev.yml ps

endlocal
