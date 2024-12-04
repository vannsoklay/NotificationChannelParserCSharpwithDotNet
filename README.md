# Notification Channel Parser 📡

## 🌟 Project Overview

Notification Channel Parser is a robust .NET Core API designed to parse and manage notification tags efficiently. The project provides a flexible solution for extracting and handling notification channels from raw text input.

## 🚀 Key Features

- **Dynamic Channel Parsing**: Extract relevant notification channels using regex
- **File-based Tag Management**: Read and write tags to persistent storage
- **Flexible API Endpoints**: Support for parsing, reading, and writing tags
- **Cross-Platform Compatibility**: Built with .NET Core

## 📋 Prerequisites

- [.NET SDK 6.0+](https://dotnet.microsoft.com/download)
- [Visual Studio](https://visualstudio.microsoft.com/) or [Visual Studio Code](https://code.visualstudio.com/)
- Git

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/vannsoklay/notification-channel-parser.git
cd notification-channel-parser
```

### 2. Restore Dependencies

```bash
dotnet restore
```

### 3. Run the Application

```bash
dotnet run
```

## 🌐 API Endpoints

### Parse Notification

- **Endpoint**: `POST /api/notification/parse`
- **Description**: Extract notification channels from input text
- **Request Body**: 
  ```
  "[BE][QA][Urgent] System error detected"
  ```
- **Response**:
  ```
  Receive channels: BE, QA, Urgent
  ```
```bash
curl --location 'http://localhost:5062/api/notification/parse' \
--header 'Content-Type: application/json' \
--data '"[BE][QA][HAHA][Urgent] there is error"'
```

### Read Tags

- **Endpoint**: `GET /api/notification/tags`
- **Description**: Retrieve all stored tags
- **Response**:
  ```json
  ["BE", "QA", "Urgent", "HAHA"]
  ```

```bash
curl --location 'http://localhost:5062/api/notification/tags'
```

### Write Tag

- **Endpoint**: `POST /api/notification/tag`
- **Description**: Add a new tag to storage
- **Request Body**: 
  ```
  "NewTag"
  ```
- **Response**:
  ```
  Value 'NewTag' added to file tags
  ```
```bash
curl --location 'http://localhost:5062/api/notification/tag' \
--header 'Content-Type: application/json' \
--data '"Urgent"'
```

## 🧪 Testing

Run unit tests:
```bash
dotnet test
```

## 🔒 Configuration

Configure notification channels in `appsettings.json`:
```json
{
  "NotificationSettings": {
    "RelevantChannels": ["BE", "FE", "QA", "Urgent"]
  }
}
```

## 📦 Dependencies

- Microsoft.AspNetCore.Mvc
- System.Text.RegularExpressions
- Microsoft.Extensions.Logging