import json

dicionario = {
"users": [],
"tasks": []
}

daily_tasks = [
    "Wake up early and stretch",
    "Make your bed",
    "Meditate or practice mindfulness",
    "Take a shower and get dressed",
    "Eat a healthy breakfast",
    "Brush your teeth and comb your hair",
    "Check your email and respond to urgent messages",
    "Plan your schedule for the day",
    "Start work on important tasks",
    "Attend meetings and collaborate with team members",
    "Complete pending tasks and meet deadlines",
    "Check in with colleagues and clients",
    "Take a break and stretch",
    "Have a healthy lunch",
    "Review progress and make adjustments as necessary",
    "Have a healthy snack",
    "Finish up work for the day",
    "Exercise or engage in physical activity",
    "Cook or prepare dinner",
    "Spend time with family or friends",
    "Relax and unwind",
    "Read a book or listen to music",
    "Go to bed at a reasonable time",
    "Learn a new skill or take an online course",
    "Write in a journal or reflect on your day",
    "Take a walk or go for a run",
    "Practice a musical instrument or sing",
    "Do a creative activity like painting or drawing",
    "Watch a movie or TV show",
    "Catch up on news or read a book",
    "Clean and organize your living space",
    "Attend a social event or meetup",
    "Volunteer or do community service",
    "Practice a foreign language",
    "Take a nap or rest",
    "Make a healthy smoothie or juice",
    "Do a crossword or puzzle",
    "Visit a museum or art gallery",
    "Listen to a podcast or audiobook",
    "Have a deep conversation with someone",
    "Write a letter to someone you care about",
    "Create a vision board or set goals",
    "Practice gratitude and appreciation",
    "Declutter your digital life",
    "Practice a form of self-care like yoga or meditation",
    "Try a new hobby or activity",
    "Learn about a different culture or religion",
    "Go to a concert or live performance",
    "Make plans for a future trip or adventure",
    "Take a class or workshop",
    "Practice forgiveness and let go of grudges",
    "Call or text a friend to check in",
    "Start a garden or plant flowers",
    "Try a new recipe or cuisine",
    "Create a budget or track expenses",
    "Take a digital detox",
    "Practice public speaking or storytelling",
    "Donate to a charity or cause you care about",
    "Do a random act of kindness",
    "Explore a new neighborhood or city",
    "Practice active listening and empathy",
    "Take a break from social media",
    "Do a DIY project or home improvement task",
    "Try a new workout or fitness routine",
    "Visit a nearby park or nature reserve",
    "Write a poem or song",
    "Organize your email inbox or computer files",
    "Attend a seminar or conference",
    "Take a personality or career assessment",
    "Practice self-reflection and self-awareness",
    "Create a vision board or set goals",
    "Try a new form of art like sculpting or printmaking",
    "Learn about a new technology or gadget",
    "Try a new form of meditation or mindfulness practice",
    "Make a gratitude list",
    "Spend time in nature and connect with the environment",
    "Join a book club or discussion group",
    "Do a digital declutter and delete unnecessary files",
    "Create a self-care routine"
    "Start your day with a glass of warm water and lemon",
    "Write a to-do list for the day",
    "Do a 10-minute yoga routine",
    "Take a cold shower",
    "Listen to a motivational podcast",
    "Have a healthy snack in between meals",
    "Learn a new word and use it in a sentence",
    "Take a 15-minute power nap",
    "Do a quick workout at home",
    "Take a break from technology for an hour",
    "Write a letter of gratitude to someone",
    "Spend time in nature and observe your surroundings",
    "Try a new recipe for lunch or dinner",
    "Do a random act of kindness for a stranger",
    "Take a 30-minute walk during lunch break",
    "Declutter your workspace or home",
    "Do a brain teaser or puzzle",
    "Listen to a new music genre",
    "Have a cup of herbal tea before bedtime",
    "Read a chapter from a non-fiction book",
    "Take a different route to work or run an errand",
    "Play videogames"
    ]


for i in range(0,100):
    utizador = {
        'id' : f'u{i}',
        'nome': f'nome{i}'
    }
    dicionario["users"].append(utizador)
    tarefa = {
        'id' : f't{i}',
        'nome': f'nome{i}',
        'what': daily_tasks[i]
    }
    dicionario["tasks"].append(tarefa)

#print(dicionario)

file = open("dataset.json",mode = "w")
json.dump(dicionario,file,indent = 4)
file.close()