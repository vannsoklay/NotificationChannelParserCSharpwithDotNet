using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.IO;
using System.Linq;
using System.Text.Json;

namespace NCP.API.Services
{
    public interface INotificationService
    {
        string ParseNotification(string input);
        string GetHelloWorld();
        void WriteToFile(string newValue);

        HashSet<string> ReadToFile();
    }

    public class NotificationService : INotificationService
    {
        private readonly HashSet<string> _relevantChannels;
        // private readonly HashSet<string> _relevantChannels = new HashSet<string> { "BE", "FE", "QA", "Urgent" };
        public NotificationService()
        {
            // Initialize _relevantChannels by calling RelevantChannels method
            _relevantChannels = RelevantChannels();
        }
        private HashSet<string> RelevantChannels()
        {
            var filePath = Path.Combine("Files", "tags.txt");

            if (!File.Exists(filePath))
            {
                throw new FileNotFoundException("The specified file does not exist.");
            }

            var content = File.ReadAllText(filePath);

            if (string.IsNullOrWhiteSpace(content))
            {
                return new HashSet<string>(); // Return empty HashSet if file is empty
            }

            // Deserialize content into a HashSet
            return JsonSerializer.Deserialize<HashSet<string>>(content) ?? new HashSet<string>();
        }

        public string ParseNotification(string input)
        {
            var regex = new Regex(@"\[([A-Za-z0-9]+)\]");
            var matches = regex.Matches(input);

            var channels = new List<string>();

            foreach (Match match in matches)
            {
                string channel = match.Groups[1].Value;
                if (_relevantChannels.Contains(channel))
                {
                    channels.Add(channel);
                }
            }

            return $"{string.Join(", ", channels)}";
        }

        public void WriteToFile(string newValue)
        {
            var filePath = Path.Combine("Files", "tags.txt");
            Directory.CreateDirectory(Path.GetDirectoryName(filePath)); // Ensure directory exists

            HashSet<string> values;

            // Read existing values from the file
            if (File.Exists(filePath))
            {
                var existingContent = File.ReadAllText(filePath);
                values = !string.IsNullOrWhiteSpace(existingContent)
                    ? JsonSerializer.Deserialize<HashSet<string>>(existingContent)
                    : new HashSet<string>();
            }
            else
            {
                values = new HashSet<string>();
            }

            // Add the new value to the set
            values.Add(newValue);

            // Write the updated set back to the file
            var jsonTags = JsonSerializer.Serialize(values);
            File.WriteAllText(filePath, jsonTags);
        }

        public HashSet<string> ReadToFile()
        {
            var filePath = Path.Combine("Files", "tags.txt");

            // Ensure the file exists
            if (!File.Exists(filePath))
            {
                throw new FileNotFoundException("The specified file does not exist.");
            }

            var content = File.ReadAllText(filePath);

            // If the file is empty or only contains whitespace, return an empty HashSet
            if (string.IsNullOrWhiteSpace(content))
            {
                return new HashSet<string>();
            }

            // Deserialize the JSON content into a HashSet
            return JsonSerializer.Deserialize<HashSet<string>>(content) ?? new HashSet<string>();
        }
        public string GetHelloWorld()
        {
            return "Hello World";
        }
    }
}

