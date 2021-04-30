import json

with open('sections.json') as f:
    sections = json.load(f)

dayCount = {}

for section in sections:
   meetings = section['meetings']
   for meeting in meetings:
       day = meeting['day']
       print(day)
       for char in day:
        if char in dayCount:
            dayCount[char] = dayCount[char] + 1
        else:
                dayCount[char] = 1


   