#!/usr/bin/env python3
# Script to fix encoding issues in pets.html

import re

# Read the file
with open(
    "/Users/wayne/source/gagpets/pets.html", "r", encoding="utf-8", errors="replace"
) as f:
    content = f.read()

# Fix the corrupt characters
# Replace any replacement character (�) followed by " Mythical</button>" with proper format
content = re.sub(
    r"� Mythical</button>",
    '<span class="source-icon-placeholder" data-source="Mythical Egg"></span>Mythical</button>',
    content,
)

# Write the file back
with open("/Users/wayne/source/gagpets/pets.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed encoding issues in pets.html")
