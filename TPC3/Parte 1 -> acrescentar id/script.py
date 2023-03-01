import json

f =  open("dataset-extra1.json",encoding="utf8")
dicionario = json.load(f)
pessoas = dicionario['pessoas']
id = 0
for pessoa in pessoas:
    pessoa['id'] =  f"p{id}"
    id+=1

with open("dataset-extra1.json", "w") as f:
    json.dump(dicionario,f,indent=4)