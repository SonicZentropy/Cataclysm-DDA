import json
import re
import sys

def fix_json(text):
    return re.sub(r',(\s*[}\]])', r'\1', text)

def swap_fg(fg):
    if isinstance(fg, list) and len(fg) >= 2 and fg[-1] > fg[1]:
        result = fg[:]
        result[1], result[-1] = result[-1], result[1]
        return result
    return fg

def process(obj):
    if isinstance(obj, dict):
        return {k: (swap_fg(v) if k == 'fg' else process(v)) for k, v in obj.items()}
    if isinstance(obj, list):
        return [process(item) for item in obj]
    return obj

text = sys.stdin.read().strip()
if not text.startswith('['):
    text = '[' + text.rstrip(',') + ']'

data = json.loads(fix_json(text))
result = process(data)

output = json.dumps(result, indent=2)
# Strip the outer [] wrapper if we added it
if not sys.stdin.isatty():
    output = output[1:-1].strip()

print(output)