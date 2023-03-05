import json

ficheiros = ["dataset-extra1.json","dataset-extra2.json","dataset-extra3.json","dataset.json"]
dicionarioTotal = {}
id = 0

for ficheiro in ficheiros:
    with open(ficheiro, encoding="utf8") as f:
        dicionario = json.load(f)
    pessoas = dicionario['pessoas']
    for pessoa in pessoas:
        pessoa['id'] = f"p{id}"
        id += 1
    for key, value in dicionario.items():
        if key == "pessoas":
            dicionarioTotal[key] = dicionarioTotal.get(key, []) + value
        else:
            dicionarioTotal[key] = value

with open("dataset-res.json", "w") as f:
    json.dump(dicionarioTotal,f,indent=4)