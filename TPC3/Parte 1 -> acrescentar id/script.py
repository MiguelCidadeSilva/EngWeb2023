import json

f =  open("dataset-extra1.json",encoding="utf8")
dicionario = json.load(f)
pessoas = dicionario['pessoas']

def acrescentaid(pessoas):
    id = 1
    for pessoa in pessoas:
        pessoa['id'] =  id
        id+=1
    return pessoas

with open("dataset-extra1.json", "w") as f:
    json.dump(acrescentaid(pessoas),f,indent=4)