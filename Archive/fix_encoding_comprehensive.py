#!/usr/bin/env python3
# Script to fix all encoding issues in pets.html

import re

# Read the file
with open(
    "/Users/wayne/source/gagpets/pets.html", "r", encoding="utf-8", errors="replace"
) as f:
    content = f.read()

# Fix all the corrupt characters we identified
fixes = [
    # Rare Egg option
    ("� Rare Egg</option>", "🥚 Rare Egg</option>"),
    # Common Summer Egg option
    ("�️ Common Summer Egg</option>", "🏖️ Common Summer Egg</option>"),
    # Mythical Egg button (already done but just in case)
    (
        "� Mythical</button>",
        '<span class="source-icon-placeholder" data-source="Mythical Egg"></span>Mythical</button>',
    ),
]

for old, new in fixes:
    content = content.replace(old, new)

# Also handle any general replacement characters that might be adjacent to emojis
content = re.sub(r"�([️]?)\s*([A-Za-z])", r"🥚\1 \2", content)

# Write the file back
with open("/Users/wayne/source/gagpets/pets.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed all encoding issues in pets.html")
